
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Créer un utilisateur (inscription)
// POST /users/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Connexion utilisateur
// POST /users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Déconnexion utilisateur
// GET /users/logout
router.get("/logout", protect, (req, res) => {
  res.json({ message: "Déconnexion réussie" });
});

// Obtenir l'utilisateur connecté
// GET /users/me
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// CRUD Utilisateurs
// Liste des utilisateurs
router.get("/", protect, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Récupérer un utilisateur par email
router.get("/:email", protect, async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select("-password");
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
});

// Modifier un utilisateur
router.put("/:email", protect, async (req, res) => {
  const { username, password } = req.body;
  let updateData = { username };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: req.params.email },
    updateData,
    { new: true }
  ).select("-password");

  if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(updatedUser);
});

// Supprimer un utilisateur
router.delete("/:email", protect, async (req, res) => {
  const deletedUser = await User.findOneAndDelete({ email: req.params.email });
  if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json({ message: "Utilisateur supprimé avec succès" });
});

module.exports = router;
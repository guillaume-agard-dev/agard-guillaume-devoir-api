const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * POST /users/register
 * - utilise le pre('save') pour hasher
 * - email unique
 * - On peut retirer `protect` si l’inscription doit être publique.
 */
router.post("/register", /* protect, */ async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Données invalides (mot de passe min 6 caractères)" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/logout", protect, (req, res) => {
  res.json({ message: "Déconnexion réussie" });
});

router.get("/me", protect, async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select("-password");
    if (!me) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(me);
  } catch (err) {
    console.error("me error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ username: 1 });
    res.json(users);
  } catch (err) {
    console.error("list error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:email", protect, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    console.error("get error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:email", protect, async (req, res) => {
  try {
    const { username, password } = req.body;
    const update = {};
    if (username) update.username = username;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Mot de passe trop court (min 6 caractères)" });
      }
      update.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      update,
      { new: true, runValidators: true, projection: { password: 0 } }
    );

    if (!updated) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updated);
  } catch (err) {
    console.error("update error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:email", protect, async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ email: req.params.email });
    if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("delete error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
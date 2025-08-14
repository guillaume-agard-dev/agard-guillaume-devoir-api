const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');

// Lister tous les utilisateurs
router.get('/', (req, res) => {
  res.send("Lister tous les utilisateurs");
});

// Récupérer un utilisateur par email
router.get('/:email', (req, res) => {
  res.send(`Détails de l'utilisateur avec l'email ${req.params.email}`);
});

// Créer un utilisateur
router.post('/', (req, res) => {
  res.send("Créer un utilisateur");
});

// Modifier un utilisateur
router.put('/:email', (req, res) => {
  res.send(`Modifier l'utilisateur avec l'email ${req.params.email}`);
});

// Supprimer un utilisateur
router.delete('/:email', (req, res) => {
  res.send(`Supprimer l'utilisateur avec l'email ${req.params.email}`);
});

// Connexion
router.post('/login', loginUser);

// Déconnexion
router.get('/logout', (req, res) => {
  res.send("Déconnexion utilisateur");
});

module.exports = router;
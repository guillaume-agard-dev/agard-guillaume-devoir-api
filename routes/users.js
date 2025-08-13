const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lister tous les utilisateurs
router.get('/users', (req, res) => {
  res.send("Lister tous les utilisateurs");
});

// Récupérer un utilisateur par email
router.get('/users/:email', (req, res) => {
  res.send(`Détails de l'utilisateur avec l'email ${req.params.email}`);
});

// Créer un utilisateur
router.post('/users', (req, res) => {
  res.send("Créer un utilisateur");
});

// Modifier un utilisateur
router.put('/users/:email', (req, res) => {
  res.send(`Modifier l'utilisateur avec l'email ${req.params.email}`);
});

// Supprimer un utilisateur
router.delete('/users/:email', (req, res) => {
  res.send(`Supprimer l'utilisateur avec l'email ${req.params.email}`);
});

// Connexion
router.post('/login', (req, res) => {
  res.send("Connexion utilisateur");
});

// Déconnexion
router.get('/logout', (req, res) => {
  res.send("Déconnexion utilisateur");
});

module.exports = router;
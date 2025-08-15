const express = require('express');
const fs = require('fs');
const path = require('path');
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const reservationsPath = path.join(__dirname, '../data/reservations.json');

// Toutes les réservations
router.get('/catways/:catwayNumber/reservations', protect, (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(reservationsPath, 'utf-8'));
  res.json(reservations);
});

// Réservations d’un catway
router.get('/catways/:catwayNumber/reservations', protect, (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(reservationsPath, 'utf-8'));
  const filtered = reservations.filter(r => r.catwayNumber == req.params.catwayNumber);
  res.json(filtered);
});

// Nouvelle réservation
router.post('/:catwayNumber/reservations', protect, (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(reservationsPath, 'utf-8'));
  const newReservation = { ...req.body, catwayNumber: parseInt(req.params.catwayNumber) };
  reservations.push(newReservation);
  fs.writeFileSync(reservationsPath, JSON.stringify(reservations, null, 2));
  res.json(newReservation);
});

// Modifier réservation
router.put('/catways/:catwayNumber/reservations/:clientName', protect, (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(reservationsPath, 'utf-8'));
  const index = reservations.findIndex(r =>
    r.catwayNumber == req.params.catwayNumber && r.clientName === req.params.clientName
  );
  if (index === -1) return res.status(404).json({ message: "Réservation non trouvée" });

  reservations[index] = { ...reservations[index], ...req.body };
  fs.writeFileSync(reservationsPath, JSON.stringify(reservations, null, 2));
  res.json(reservations[index]);
});

// Supprimer réservation
router.delete('/catways/:catwayNumber/reservations/:clientName', protect, (req, res) => {
  let reservations = JSON.parse(fs.readFileSync(reservationsPath, 'utf-8'));
  reservations = reservations.filter(r =>
    !(r.catwayNumber == req.params.catwayNumber && r.clientName === req.params.clientName)
  );
  fs.writeFileSync(reservationsPath, JSON.stringify(reservations, null, 2));
  res.json({ message: "Réservation supprimée" });
});

module.exports = router;
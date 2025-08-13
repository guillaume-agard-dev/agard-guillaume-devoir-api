const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');

// Lister toutes les réservations d’un catway
router.get('/', reservationController.getAll);

// Récupérer une réservation précise
router.get('/:idReservation', reservationController.getOne);

// Créer une réservation
router.post('/', reservationController.create);

// Modifier une réservation
router.put('/:idReservation', reservationController.update);

// Supprimer une réservation
router.delete('/:idReservation', reservationController.remove);

module.exports = router;
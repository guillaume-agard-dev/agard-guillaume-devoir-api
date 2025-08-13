const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// Lister les catways
router.get('/', catwayController.getAll);

// Récupérer un catway
router.get('/:id', catwayController.getOne);

// Créer un catway
router.post('/', catwayController.create);

// Modifier l'état d'un catway
router.put('/:id', catwayController.update);

// Supprimer un catway
router.delete('/:id', catwayController.remove);


module.exports = router;
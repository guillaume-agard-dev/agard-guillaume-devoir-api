exports.getAll = (req, res) => {
  res.send(`Lister toutes les réservations du catway ${req.params.id}`);
};

exports.getOne = (req, res) => {
  res.send(`Détails de la réservation ${req.params.idReservation} pour le catway ${req.params.id}`);
};

exports.create = (req, res) => {
  res.send(`Créer une réservation pour le catway ${req.params.id}`);
};

exports.update = (req, res) => {
  res.send(`Modifier la réservation ${req.params.idReservation} du catway ${req.params.id}`);
};

exports.remove = (req, res) => {
  res.send(`Supprimer la réservation ${req.params.idReservation} du catway ${req.params.id}`);
};
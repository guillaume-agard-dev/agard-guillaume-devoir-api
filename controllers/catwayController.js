exports.getAll = (req, res) => {
  res.send('Lister tous les catways');
};

exports.getOne = (req, res) => {
  res.send(`Détails du catway ${req.params.id}`);
};

exports.create = (req, res) => {
  res.send('Créer un catway');
};

exports.update = (req, res) => {
  res.send(`Modifier le catway ${req.params.id}`);
};

exports.remove = (req, res) => {
  res.send(`Supprimer le catway ${req.params.id}`);
};
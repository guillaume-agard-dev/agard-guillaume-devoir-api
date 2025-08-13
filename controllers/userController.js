exports.getAll = (req, res) => {
  res.send('Lister tous les utilisateurs');
};

exports.getOne = (req, res) => {
  res.send(`Détails de l'utilisateur avec l'email ${req.params.email}`);
};

exports.create = (req, res) => {
  res.send('Créer un utilisateur');
};

exports.update = (req, res) => {
  res.send(`Modifier l'utilisateur avec l'email ${req.params.email}`);
};

exports.remove = (req, res) => {
  res.send(`Supprimer l'utilisateur avec l'email ${req.params.email}`);
};


// Gestion de la connexion

exports.login = (req, res) => {
  res.send('Connexion utilisateur');
};

exports.logout = (req, res) => {
  res.send('Déconnexion utilisateur');
};
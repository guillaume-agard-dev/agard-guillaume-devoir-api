const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Récupération du token depuis les headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, aucun token fourni" });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On stocke l'utilisateur
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = protect;
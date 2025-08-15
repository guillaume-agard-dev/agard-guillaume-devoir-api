const express = require("express");
const fs = require("fs");
const path = require("path");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const dataFile = path.join(__dirname, "../data/catways.json");

// Lire tous les catways
router.get("/", protect, (req, res) => {
  const catways = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(catways);
});

// Ajouter un catway
router.post("/", protect, (req, res) => {
  const catways = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  const newCatway = {
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  };
  catways.push(newCatway);
  fs.writeFileSync(dataFile, JSON.stringify(catways, null, 2));
  res.json(newCatway);
});

// Modifier un catway
router.put("/:catwayNumber", protect, (req, res) => {
  const catways = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  const index = catways.findIndex(c => c.catwayNumber == req.params.catwayNumber);
  if (index === -1) return res.status(404).json({ message: "Catway non trouvé" });

  catways[index] = { ...catways[index], ...req.body };
  fs.writeFileSync(dataFile, JSON.stringify(catways, null, 2));
  res.json(catways[index]);
});

// Supprimer un catway
router.delete("/:catwayNumber", protect, (req, res) => {
  let catways = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  catways = catways.filter(c => c.catwayNumber != req.params.catwayNumber);
  fs.writeFileSync(dataFile, JSON.stringify(catways, null, 2));
  res.json({ message: "Catway supprimé" });
});

module.exports = router;
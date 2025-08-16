const express = require("express");
const Catway = require("../models/Catway");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET /catways
router.get("/", protect, async (_req, res) => {
  const list = await Catway.find().sort({ catwayNumber: 1 });
  res.json(list);
});

// GET /catways/:id   (id = catwayNumber)
router.get("/:id", protect, async (req, res) => {
  const cw = await Catway.findOne({ catwayNumber: Number(req.params.id) });
  if (!cw) return res.status(404).json({ message: "Catway non trouvé" });
  res.json(cw);
});

// POST /catways
router.post("/", protect, async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    if (catwayNumber == null || !catwayType || !catwayState) {
      return res.status(400).json({ message: "Données incomplètes" });
    }

    const exists = await Catway.findOne({ catwayNumber });
    if (exists) return res.status(409).json({ message: "catwayNumber déjà utilisé" });

    const created = await Catway.create({ catwayNumber, catwayType, catwayState });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// PUT /catways/:id   (seul catwayState modifiable)
router.put("/:id", protect, async (req, res) => {
  const { catwayState } = req.body;
  if (!catwayState) return res.status(400).json({ message: "catwayState requis" });

  const updated = await Catway.findOneAndUpdate(
    { catwayNumber: Number(req.params.id) },
    { catwayState },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ message: "Catway non trouvé" });
  res.json(updated);
});

// DELETE /catways/:id
router.delete("/:id", protect, async (req, res) => {
  const deleted = await Catway.findOneAndDelete({ catwayNumber: Number(req.params.id) });
  if (!deleted) return res.status(404).json({ message: "Catway non trouvé" });
  res.json({ message: "Catway supprimé" });
});

module.exports = router;

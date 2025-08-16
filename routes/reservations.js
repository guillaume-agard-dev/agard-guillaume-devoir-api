const express = require("express");
const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// (Utile pour dashboard) GET /reservations → toutes
router.get("/reservations", protect, async (_req, res) => {
  const all = await Reservation.find().sort({ catwayNumber: 1, startDate: 1 });
  res.json(all);
});

// GET /catways/:id/reservations
router.get("/:id/reservations", protect, async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const list = await Reservation.find({ catwayNumber }).sort({ startDate: 1 });
  res.json(list);
});

// GET /catways/:id/reservations/:reservationId
router.get("/:id/reservations/:reservationId", protect, async (req, res) => {
  const r = await Reservation.findById(req.params.reservationId);
  if (!r || r.catwayNumber !== Number(req.params.id)) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }
  res.json(r);
});

// POST /catways/:id/reservations
router.post("/:id/reservations", protect, async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const { clientName, boatName, startDate, endDate } = req.body;

    // vérifier catway existant
    const cw = await Catway.findOne({ catwayNumber });
    if (!cw) return res.status(404).json({ message: "Catway inexistant" });

    if (!clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: "startDate doit précéder endDate" });
    }

    const created = await Reservation.create({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate
    });

    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// PUT /catways/:id/reservations/:reservationId
router.put("/:id/reservations/:reservationId", protect, async (req, res) => {
  const r = await Reservation.findById(req.params.reservationId);
  if (!r || r.catwayNumber !== Number(req.params.id)) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }

  const { boatName, clientName, startDate, endDate } = req.body;
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ message: "startDate doit précéder endDate" });
  }

  if (boatName !== undefined) r.boatName = boatName;
  if (clientName !== undefined) r.clientName = clientName;
  if (startDate !== undefined) r.startDate = startDate;
  if (endDate !== undefined) r.endDate = endDate;

  const saved = await r.save();
  res.json(saved);
});

// DELETE /catways/:id/reservations/:reservationId
router.delete("/:id/reservations/:reservationId", protect, async (req, res) => {
  const r = await Reservation.findById(req.params.reservationId);
  if (!r || r.catwayNumber !== Number(req.params.id)) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }
  await r.deleteOne();
  res.json({ message: "Réservation supprimée" });
});

module.exports = router;

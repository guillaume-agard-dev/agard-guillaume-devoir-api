const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();


// Import des modèles
const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");


const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Lecture des fichiers JSON
    const catways = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/catways.json"), "utf-8"));
    const reservations = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/reservations.json"), "utf-8"));

    // Suppression des anciennes données
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // Insertion des nouvelles données
    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log("Données importées avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors de l'import :", err);
    process.exit(1);
  }
};

importData();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const protect = require("./middleware/authMiddleware");

const app = express();
const port = process.env.port || 8080;

// Connexion à MongoDB
connectDB();

// Page d'accueil
app.use(express.static('public'));

// Import des routes
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/userRoutes');



// Middlewares
app.use(cors());
app.use(express.json());


// Utilisation des routes
app.use('/catways', catwaysRoutes);
app.use('/catways/:id/reservations', reservationsRoutes);
app.use('/users', usersRoutes);


// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

const path = require("path");

app.get("/dashboard", protect, (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});
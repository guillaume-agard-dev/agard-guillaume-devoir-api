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
const usersRoutes = require('./routes/users');



// Middlewares
app.use(cors());
app.use(express.json());


// Utilisation des routes
app.use('/catways', catwaysRoutes);
app.use('/catways/:id/reservations', reservationsRoutes);
app.use('/', usersRoutes);  // users + login/logout


// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

// Proctection tableau de bord
app.get("/dashboard", protect, (req, res) => {
  res.send(`
    <h1>Bienvenue ${req.user.username}</h1>
    <p>Email : ${req.user.email}</p>
    <p>Date : ${new Date().toLocaleDateString()}</p>
  `);
});
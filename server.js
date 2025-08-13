require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.port || 8080;

// Connexion à MongoDB
connectDB();

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
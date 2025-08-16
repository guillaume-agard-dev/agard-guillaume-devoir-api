require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const protect = require("./middleware/authMiddleware");

const app = express();
const port = process.env.port || 8080;

// Connexion à MongoDB
connectDB();
// Middlewares
app.use(cors());
app.use(express.json());
// Page HTML
app.use(express.static('public'));



// Utilisation des routes
app.use('/catways', require('./routes/catways'));
app.use('/catways', require('./routes/reservations'));
app.use('/users', require('./routes/userRoutes'));


// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});


app.get("/dashboard", protect, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
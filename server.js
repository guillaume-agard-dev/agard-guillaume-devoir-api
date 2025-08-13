require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('API Reservation Catway OK');
});

// Port d'écoute
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
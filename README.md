# 🚤 Reservation Catway – Port de plaisance Russell

Application web de gestion des réservations de catways pour la capitainerie du port de plaisance Russell.  
Ce projet a été développé en **Node.js/Express** avec **MongoDB Atlas** et inclut un frontend simple (HTML/CSS/JS) intégré à Express.  

---

## 📌 Fonctionnalités

- **Authentification JWT** (connexion / déconnexion)  
- **Tableau de bord** avec utilisateur connecté, date du jour, et réservations en cours  
- **CRUD complet** pour :  
  - Catways  
  - Réservations  
  - Utilisateurs  
- **Documentation API** disponible via `/docs.html`  

---

## 🚀 Déploiement

L’application est déployée sur **Render** avec MongoDB hébergé sur **Atlas**.  

- 🌍 [Accéder à l’application en ligne](https://agard-guillaume-devoir-api.onrender.com)  

Identifiants de test :  
email : cap2@example.com
mot de passe : secret34


---

## ⚙️ Installation locale

### 1. Cloner le dépôt
```bash
git clone https://github.com/guillaume-agard-dev/agard-guillaume-devoir-api
cd reservation-catway
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Créer un fichier .env
À la racine du projet, ajoute un fichier .env :
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/reservation-catway
JWT_SECRET=supersecretkey123!
PORT=8080
```

### 4. Lancer l’application
En mode développement :
```
npm run dev
```

En mode production :
```
npm start
```

L’application sera accessible sur :
👉 http://localhost:8080

---

## 📂 Structure du projet
```
reservation-catway/
│── config/           # Connexion MongoDB
│── controllers/      # Logique métier
│── data/             # Données JSON (exemples)
│── middleware/       # Authentification JWT
│── models/           # Modèles Mongoose
│── public/           # Frontend (HTML, CSS, JS)
│── routes/           # Routes Express
│── server.js         # Point d’entrée
│── package.json
│── .env.example      # Exemple de configuration
```

---

## 🛠️ Technologies
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT pour l’authentification
- HTML / CSS / JS natif pour le frontend
- Déploiement : Render

const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, "Email invalide"]
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userShema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
});


userShema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userShema);
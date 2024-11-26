const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    occupation: { type: String },
    createPassword: { type: String, required: [true, "Password is required"] },
});

module.exports = mongoose.model("Member", memberSchema);

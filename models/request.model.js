const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    mobile: { type: Number, required: [true, "Mobile number is required"] },
    email: { type: String, required: [true, "Email is required"] },
    amt: { type: Number, required: [true, "Amount is required"] },
    type: { type: String, required: [true, "Type is required"] },
    msg: { type: String },
    code: { type: String, required: [true, "Code is required"] },
});

module.exports = mongoose.model("Request", requestSchema);

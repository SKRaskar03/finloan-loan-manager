const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
    type: { type: String, required: [true, "Service must have type!"] },
    code: { type: String, required: [true, "Service must have code!"] },
    description: { type: String },
    imgUrl: { type: String },
    detail: { type: Array },
});

module.exports = mongoose.model("Service", serviceSchema);

const mongoose = require("mongoose");
const User = require("./User");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    source: { type: String, required: true }, // Salary, Freelance etc.
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true});

module.exports = mongoose.model("Income", IncomeSchema);

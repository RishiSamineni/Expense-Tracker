
const User = require("../models/User");
const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date){
            return res.status(400).json({ message: "All fields are required to be filled" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

// Get All Income Details
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

// Delete Income
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch(error){
        res.status({ message: "Server Error" });
    }
}
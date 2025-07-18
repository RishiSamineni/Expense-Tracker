const User = require("../models/User");
const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date){
            return res.status(400).json({ message: "All fields are required to be filled" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

// Get All Expense Details
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}


// Delete Expense
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch(error){
        res.status({ message: "Server Error" });
    }
}
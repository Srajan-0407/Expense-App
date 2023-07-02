const Expense = require('../models/Expense');

const expenseController = {}

expenseController.show = async (req, res) => {
    try {
        const id = req.user.id
        const expense = await Expense.find({ userId: id, isDeleted: false })
        res.json(expense)
    } catch (error) {
        res.json(error.message)
    }
},
    expenseController.showDeleted = async (req, res) => {
        try {
            const id = req.user.id
            const expense = await Expense.find({ userId: id, isDeleted: true })
            res.json(expense)
        } catch (error) {
            res.json(error.message)
        }
    }
expenseController.create = async (req, res) => {
    try {
        const body = req.body
        body.userId = req.user.id
        const expenseObj = new Expense(body)
        const expense = await expenseObj.save()
        res.json(expense)
    } catch (error) {
        res.json(error.message)
    }
}
expenseController.update = async (req, res) => {
    try {
        const { body } = req
        const { id } = req.params
        const expense = await Expense.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        res.json(expense)
    } catch (error) {
        res.json(error.message)

    }
}
expenseController.softDelete = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Expense.findOneAndUpdate(
            { _id: id },
            { $set: { isDeleted: true } },
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (error) {
        res.json(error.message);
    }
}
expenseController.UndoDelete = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Expense.findOneAndUpdate(
            { _id: id },
            { $set: { isDeleted: false } },
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (error) {
        res.json(error.message);
    }
}
module.exports = expenseController
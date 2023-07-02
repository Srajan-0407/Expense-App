const Category = require('../models/Category')
const Expense = require('../models/Expense')
const categoryController = {}
categoryController.create = async (req, res) => {
    try {
        const body = req.body
        body.userId = req.user.id
        const categoryObj = await new Category(body)
        const category = await categoryObj.save()
        res.json(category)
    } catch (error) {
        res.json(error.message)
    }
}
categoryController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Promise.all([Category.findByIdAndDelete(id), Expense.deleteMany({ categoryId: id })])
        const [cat, exp] = result

        res.json(cat)
    } catch (error) {
        res.json(error)
    }
}

categoryController.list = async (req, res) => {
    try {
        const id = req.user.id
        const category = await Category.find({ userId: id })
        res.json(category)
    } catch (error) {
        res.json(error)
    }
}
module.exports = categoryController
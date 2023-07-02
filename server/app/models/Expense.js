const mongoose = require('mongoose');
const { Schema } = mongoose
const expenseSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Date: {
        type: String
    }
})

const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense


const mongoose = require('mongoose');
const { Schema } = mongoose
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
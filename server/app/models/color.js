const mongoose = require('mongoose');
const { Schema } = mongoose
const colorSchema = new Schema({
    color: {
        type: String
    },
    logs: [
        { stamps: { type: String } }
    ],
    hoverCounts: {
        type: Number,
        default: 0
    }
})

const Color = mongoose.model('Color', colorSchema)
module.exports = Color


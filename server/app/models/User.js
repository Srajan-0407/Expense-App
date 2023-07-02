const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');
const { Schema } = mongoose
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function () {
                return 'Invalid Email Format'
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

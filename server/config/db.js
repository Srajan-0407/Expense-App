const mongoose = require('mongoose');
const configDB = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/expense-db')
        console.log('connected to db');
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = configDB
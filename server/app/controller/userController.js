const User = require('../models/User')
const bycrypt = require('bcrypt')
const Expense = require('../models/Expense');
const Category = require('../models/Category')
const jwt = require('jsonwebtoken');
const userController = {}

userController.create = async (req, res) => {
    try {
        const body = req.body
        const userObj = new User(body)
        const salt = await bycrypt.genSalt()
        const encPass = await bycrypt.hash(userObj.password, salt)
        userObj.password = encPass
        const user = await userObj.save()
        res.json(user)
    } catch (error) {
        res.json(error.message);
    }
}

userController.deleteAccount = async (req, res) => {
    const id = req.user.id
    const body = req.body
    try {
        const user = await User.findById(id)
        const passComp = await bycrypt.compare(body.password, user.password);
        if (passComp) {
            const result = await Promise.all([User.findByIdAndDelete(id), Expense.deleteMany({ userId: id }), Category.deleteMany({ userId: id })])
            res.json(result)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error);
    }
}



userController.login = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.json({ error: 'Invalid Password / Email ' });
        }
        const passComp = await bycrypt.compare(body.password, user.password);
        // console.log(passComp);
        if (!passComp) {
            return res.json({ error: 'Invalid Password / Email' });
        }
        const tokenData = { _id: user._id, email: user.email }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '2d' })
        return res.json({ token: token });
    } catch (error) {
        return res.json({ error: error.message });
    }
};
userController.addbudget = async (req, res) => {
    const id = req.user.id;
    const body = req.body;
    try {
        const budget = await User.findOneAndUpdate(
            { _id: id },
            { $set: { budget: body.budget } },
            { new: true, runValidators: true }
        );
        res.json(budget)
    } catch (error) {
        res.json(error);
    }
};

userController.show = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.json(error.message)
    }
}
module.exports = userController
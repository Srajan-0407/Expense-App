
const Color = require('../models/color');
const colorController = {}

colorController.create = async (req, res) => {
    try {
        const body = req.body.count
        colorObj = []
        for (let i = 1; i <= body; i++) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const obj = { color: `#${randomColor}` }
            colorObj.push(obj)
        }
        const countDocs = await Color.countDocuments({})
        let insertNewDocs
        if (countDocs > 0) {
            const deleteDocs = await Color.deleteMany()
            insertNewDocs = await Color.insertMany(colorObj)
        } else {
            insertNewDocs = await Color.insertMany(colorObj)
        }
        res.json(insertNewDocs)
    } catch (error) {
        res.json(error)
    }
}
colorController.addTime = async (req, res) => {
    const id = req.params.id
    const date = new Date()
    console.log(id);
    try {
        const colorObj = await Color.findByIdAndUpdate(id, { $push: { logs: { stamps: date } } }, { new: true, runValidators: true })
        colorObj.hoverCounts = colorObj.hoverCounts + 1
        colorObj.save()
        res.json(colorObj)
    } catch (error) {
        res.json(error4
        )
    }
}
colorController.findStamps = async (req, res) => {
    try {
        const id = req.params.id
        const stamps = await Color.findById(id)
        res.json(stamps.logs)
    } catch (error) {
        res.json(error)
    }
}
module.exports = colorController
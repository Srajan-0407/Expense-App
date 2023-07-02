const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = {
                id: tokenData._id,
            }
            next()
        } catch (error) {
            res.json(error.message)
        }
    } else {
        res.json({ error: 'Token Not Found' })
    }
}
module.exports = authenticate
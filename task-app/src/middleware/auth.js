const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user // So that we won't have to find it again in router
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authenticated' })
    }
}

module.exports = auth
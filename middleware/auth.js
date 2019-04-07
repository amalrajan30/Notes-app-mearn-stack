const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) res.status(401).json({ msg: "Unauthorized" })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        req.userId = decoded.id
        next();

    } catch (e) {
        res.status(400).json({ error: e })
    }
}

module.exports = auth
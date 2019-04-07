const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User')

router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exits" })

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credential" })

                    jwt.sign(
                        { id: user.id },
                        process.env.SECRET_KEY,
                        { expiresIn: 3000 },
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })

})


module.exports = router
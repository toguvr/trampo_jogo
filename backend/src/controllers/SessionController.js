const User = require('../models/User')
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        let currentUser = await User.findById(req.userId)

            return res.json(currentUser)
        
    },
    async signup(req, res) {
        const { username, email, password } = req.body

        let usernameEmail = await User.findOne({ email, username })
        let userEmail = await User.findOne({ email })
        let userUsername = await User.findOne({ username })
        if (userEmail) {
            return res.json({ message: "Email já cadastrado" })
        } else if (userUsername) {
            return res.json({ message: "Username já cadastrado" })
        } else {
            usernameEmail = await User.create({ username, email, password })
            const token = jwt.sign({ id: usernameEmail.id }, process.env.SECRET);
            return res.json({token: token})
        }
    },

    async change(req, res) {
        const { filename } = req.file
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(400).json({ message: 'Usuário ou senha não cadastrados' })
        }
        const newAvatar = await User.findByIdAndUpdate(req.userId, {avatar: filename})
        return res.json(newAvatar)

    },

    async login(req, res) {
        const { username, password } = req.body

        let auth = await User.findOne({ username, password })

        if (auth) {
            const token = jwt.sign({ id: auth._id }, process.env.SECRET);
            return res.json({token: token})
        } else {
            return res.json({ message: "Usuário ou senha não cadastrados" })
        }
    }
}
const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {
    async store(req, res) {

        let user = await User.findById(req.userId)

        let room = await Room.findById(user.currentRoom)

        if (!user) {
            return res.json({ message: "usuário nao encontrado" })
        } else if (!room) {
            const createRoom = await Room.create({ users: req.userId, admRoom: req.userId, roomName: user.username, playing: false, finish: false })
            await User.findByIdAndUpdate(req.userId, { currentRoom: createRoom._id })
            await createRoom.populate('users').execPopulate()
            return res.json(createRoom)
        } else if (room && room.playing === false && room.finish === true) {
            const createRoom = await Room.create({ users: req.userId, admRoom: req.userId, roomName: user.username, playing: false, finish: false })
            await User.findByIdAndUpdate(req.userId, { currentRoom: createRoom._id })
            await createRoom.populate('users').execPopulate()
            return res.json(createRoom)
        } else if (room.playing) {
            return res.json({ message: "você está em uma sala em andamento" })
        } else if (!room.playing && !room.finish) {
            return res.json({ message: "você está em uma sala em andamento" })
        } else {
            return res.json({ message: "ops, algo estranho ocorreu" })
        }
    },

    async start(req, res) {
        const { room_Id } = req.params

        let admStart = await Room.findById(room_Id)
        if (admStart && admStart.admRoom === req.userId) {

            const usersRoom = [...admStart.users]
            let numeros = [];

            // Preenche um array com os números de 1 ao maximo
            for (let numero = 1; numero <= usersRoom.length; numero++) {
                numeros.push(numero);
            }

            numeros.sort(function randomizar(a, b) {
                return Math.random() * 2 - 1; // Ordena randomicamente
            });

            let voc
            for (i = 0; i < usersRoom.length; i++) {
                if (numeros[i] === 1) {
                    voc = "sabotador"
                } else if (numeros[i] === 2) {
                    voc = "segurança"
                } else if (numeros[i] === 3) {
                    voc = "ceo"
                } else {
                    voc = "trabalhador"
                }
                await User.findByIdAndUpdate(usersRoom[i], { vocation: voc, live: true })
            }

            const startRoom = await Room.findByIdAndUpdate(room_Id, { playing: true, currentPage: 'gameHome' }, { new: true, useFindAndModify: true })
            await startRoom.populate('users').execPopulate()
            req.io.emit('playersOnRoom', startRoom)
            return res.json(startRoom)
        } else {
            return res.json({ message: "sala nao encontrada ou usuario nao e o adm" })
        }
    },

    async change(req, res) {
        const { roomId } = req.params

        let currentUser = await User.findById(req.userId)
        let roomUsers = await Room.findById(roomId)

        const newRoomUsers = [...roomUsers.users, currentUser]
        if (roomUsers.users.indexOf(req.userId) !== -1) {
            return res.json({ message: "você já está nesta sala" })
        } else {
            await User.findByIdAndUpdate(req.userId, { currentRoom: roomId }, { new: true, useFindAndModify: false })
            const currentRoom = await Room.findByIdAndUpdate(roomId, { users: newRoomUsers }, { new: true, useFindAndModify: false })
            await currentRoom.populate('users').execPopulate()
            req.io.emit('playersOnRoom', currentRoom)
            return res.json(currentRoom)
        }
    },

    async leaveRoom(req, res) {
        const { roomId } = req.params

        let currentUser = await User.findById(req.userId)
        let roomUsers = await Room.findById(roomId)
        await roomUsers.populate('users').execPopulate()
        const newRoomUsers = [...roomUsers.users]
        const idRemove = newRoomUsers.find(id => id.id === req.userId)
        const index = newRoomUsers.indexOf(idRemove)
        newRoomUsers.splice(index, 1)

        if (index === -1) {
            return res.json({ message: "usuario nao está na sala" })
        } else if (newRoomUsers.length === 0) {
            await User.findByIdAndUpdate(req.userId, { live: true, currentRoom: null }, { new: true, useFindAndModify: false })
            const currentRoom = await Room.findByIdAndUpdate(roomId, { users: newRoomUsers, finish: true }, { new: true, useFindAndModify: false })
            req.io.emit('playersOnRoom', currentRoom)
            return res.json(currentRoom)
        } else {
            await User.findByIdAndUpdate(req.userId, {live: true, currentRoom: null }, { new: true, useFindAndModify: false })
            const currentRoom = await Room.findByIdAndUpdate(roomId, { users: newRoomUsers }, { new: true, useFindAndModify: false })
            await currentRoom.populate('users').execPopulate()
            req.io.emit('playersOnRoom', currentRoom)
            return res.json(currentRoom)
        }
    },

    async index(req, res) {
        let user = await User.findById(req.userId)

        if (user) {
            const allRooms = await Room.find()
            // //enviar para usuario logado
            // const currentUserOnline = req.connectedUsers[id do player]
            // if(currentUserOnline){ req.io.to(currentUserOnline).emit}
            req.io.emit('updateRooms', allRooms)
            return res.json(allRooms)
        } else {
            return res.json({ message: "usuario logado nao encontrado" })
        }
    },

    async getRoom(req, res) {
        const { id_room } = req.params

        const currentRoom = await Room.findById(id_room)
        await currentRoom.populate('users').execPopulate()
        return res.json(currentRoom)
    }
}
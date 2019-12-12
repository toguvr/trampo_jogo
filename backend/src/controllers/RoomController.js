const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {
    async store(req, res) {

        let user = await User.findById(req.userId)
        let room = await Room.findOne({admRoom: req.userId})

        if (user && !room && room.playing===false ) {
            const createRoom = await Room.create({ users: user, admRoom: user._id, roomName: user.username, playing: false })
            return res.json(createRoom)
        } else {
            return res.json({ message: "você está em uma sala em andamento" })
        }
    },

    async start(req, res) {
        const { room_Id } = req.params

        let admStart = await Room.findById(room_Id)
        if (admStart && admStart.admRoom === req.userId) {

            const usersRoom = [...admStart.users]
            let numeros = [];
  
            // Preenche um array com os números de 1 ao maximo
            for (let numero = 1; numero <= usersRoom.length;  numero++) {
              numeros.push(numero);
            }
           
            numeros.sort(function randomizar(a, b) {
              return Math.random() * 2 - 1; // Ordena randomicamente
            });

            let voc
          for(i=0;i<usersRoom.length;i++){
            if(numeros[i]===1){
                voc="sabotador"
            }else if(numeros[i]===2){
                voc="segurança"
            }else if(numeros[i]===3){
                voc="ceo"
            }else{
                voc="trabalhador"
            }
            await User.findByIdAndUpdate(usersRoom[i],{vocation: voc})
          }

            const startRoom = await Room.findByIdAndUpdate(room_Id, { playing: true }, { new: true, useFindAndModify: true })
            return res.json(startRoom)
        } else {
            return res.status(401).json({ message: "sala nao encontrada ou usuario nao e o adm" })
        }
    },

    async change(req, res) {
        const { roomId } = req.params

        let currentUser = await User.findById(req.userId)
        let roomUsers = await Room.findById(roomId)

        const newRoomUsers = [...roomUsers.users, currentUser]
        if(roomUsers.users.indexOf(req.userId) !== -1){
            return res.json({ message: "você já está nesta sala" })
        }else if (currentUser) {
            const currentRoom = await Room.findByIdAndUpdate(roomId, { users: newRoomUsers }, { new: true, useFindAndModify: false })
            await currentRoom.populate('users').execPopulate()
            return res.json(currentRoom)
        } else {
            return res.status(401).json({ message: "usuario que esta tentando entrar na sala, nao encontrado" })
        }
    },

    async index(req, res) {
        let user = await User.findById(req.userId)

        if (user) {
            const allRooms = await Room.find()
            return res.json(allRooms)
        } else {
            return res.status(401).json({ message: "usuario logado nao encontrado" })
        }
    },

    async getRoom(req, res) {
        const { id_room } = req.params
        
        const currentRoom = await Room.findById(id_room)
        await currentRoom.populate('users').execPopulate()
        return res.json(currentRoom)
    }
}
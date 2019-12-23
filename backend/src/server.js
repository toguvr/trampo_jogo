const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server)




mongoose.connect('mongodb+srv://guto:wsde123@acusado-yiqr2.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const connectedUsers = {}

io.on('connection', socket => {
    const {token} = socket.handshake.query

    connectedUsers[token] = socket.id
    
    socket.on('omni', data=>{

        
      })
    socket.emit('hello', 'Msg do Back')
})

app.use((req,res,next)=>{
    req.io=io
    req.connectedUsers = connectedUsers
    return next()
})


//req.query = acessar query params(para filtros)
//query.params = acessar route params (para edicao, delete)
//query.body = acessar corpo da requisicao (para criacao e edicao)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333)
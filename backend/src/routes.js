const express = require ('express')
const multer = require ('multer')
const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const RoomController = require('./controllers/RoomController')
const BookingController = require('./controllers/BookingController')
const GameController = require('./controllers/GameController')
const jwt = require('jsonwebtoken');
const routes = express.Router()
const upload = multer(uploadConfig)
  
function verifyJWT(req, res, next){
    const token = req.headers['auth'];
 
    if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token fornecido.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

routes.post('/sessions/signup',SessionController.signup)
routes.post('/sessions/login',SessionController.login)
routes.put('/avatar',verifyJWT,  upload.single('avatar'), SessionController.change)
routes.get('/avatar', verifyJWT, SessionController.index)

routes.post('/room/create', verifyJWT, RoomController.store)
routes.get('/rooms', verifyJWT, RoomController.index)
routes.put('/rooms/:roomId/join', verifyJWT, RoomController.change)
routes.put('/rooms/:roomId/leave', verifyJWT, RoomController.leaveRoom)
routes.put('/rooms/:room_Id/start', verifyJWT, RoomController.start)
routes.get('/room/:id_room', verifyJWT, RoomController.getRoom)

routes.put('/vote', verifyJWT, GameController.vote)

routes.get('/spots',SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

module.exports = routes

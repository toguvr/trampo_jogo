const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    admRoom: String,
    roomName: String,
    playing: Boolean,

})

module.exports = mongoose.model('Room', RoomSchema)
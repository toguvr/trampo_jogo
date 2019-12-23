const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    currentVotes: [Object],
    admRoom: String,
    roomName: String,
    currentPage: String,
    playing: Boolean,
    finish: Boolean,
})

module.exports = mongoose.model('Room', RoomSchema)
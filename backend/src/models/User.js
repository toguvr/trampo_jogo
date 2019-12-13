const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    currentRoom: String,
    live: Boolean,
    vocation: String,
    vote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    toJSON:{
        virtuals: true
    }
}
)

UserSchema.virtual('avatar_url').get(function(){
    return `http://localhost:3333/files/${this.avatar}`
})

module.exports = mongoose.model('User', UserSchema)
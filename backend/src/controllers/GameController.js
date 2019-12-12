const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {
    async vote(req, res) {
        const { room_Id, votedUser_id, vocation } = req.body
        const room = await Room.findById(room_Id)

        if(!room){
            return res.status(401).json({ message: "sala nao encontrada." })
        }

        const currentUserVote = await User.findByIdAndUpdate(req.userId, {vote: votedUser_id})
        await currentUserVote.populate('vote').execPopulate()
        return res.json(currentUserVote)
    },

}
const User = require('../models/User')
const Room = require('../models/Room')

module.exports = {
  async vote(req, res) {
    const { votedUser_id, room_Id, vocation, page } = req.body

    const room = await Room.findById(room_Id)
    await room.populate('users').execPopulate()

    if (page === 'gameHome') {
      const currentVotes = room.currentVotes

      const voted = currentVotes.find(user => {
        return user.user == req.userId
      })

      if (voted === undefined) {
        const personVote = { vocation, votedUser_id, user: req.userId }
        currentVotes.push(personVote)
        await User.findByIdAndUpdate(req.userId, { vote: votedUser_id }, { new: true, useFindAndModify: true })
        await Room.findByIdAndUpdate(room_Id, { currentVotes: currentVotes }, { new: true, useFindAndModify: true })
        const usersAlive = room.users.filter(user => user.live === true)
        
        console.log(currentVotes.length, usersAlive.length)
        console.log(usersAlive.length)
        if(usersAlive.length>2){
        if (currentVotes.length === usersAlive.length) {
          const segVote = currentVotes.find(user => {
            return user.vocation === 'segurança'
          })
          const sabVote = currentVotes.find(user => {
            return user.vocation === 'sabotador'
          })
          if (segVote.votedUser_id !== sabVote.votedUser_id) {
            const who = await User.findByIdAndUpdate(votedUser_id, { live: false }, { new: true, useFindAndModify: true })
            console.log(who)
            await Room.findByIdAndUpdate(room_Id, { currentVotes: [], currentPage: "gameVote" }, { new: true, useFindAndModify: true })
            const roomz = await Room.findById(room_Id)
            await roomz.populate('users').execPopulate()
            req.io.emit('playersOnRoom', roomz)
            return res.json(roomz)
          } else {
            await Room.findByIdAndUpdate(room_Id, { currentVotes: [], currentPage: "gameVote" }, { new: true, useFindAndModify: true })
            const roomb = await Room.findById(room_Id)
            await roomb.populate('users').execPopulate()
            req.io.emit('playersOnRoom', roomb)
            return res.json(roomb)
          }
        }} else {
          const roomFinish2 = await Room.findByIdAndUpdate(room_Id, { currentVotes: [], currentPage: "gameHome", playing: false}, { new: true, useFindAndModify: true })
          return res.json(roomFinish2)
        }
      } else {
        return res.json({ message: "usuario já votou." })
      }
    } else if (page === 'gameVote') {
      const currentVotesDiscussion = room.currentVotes
      const voted2 = currentVotesDiscussion.find(user => {
        return user.user == req.userId
      })

      if (voted2 === undefined) {
        
        currentVotesDiscussion.push(votedUser_id)
        await User.findByIdAndUpdate(req.userId, { vote: votedUser_id }, { new: true, useFindAndModify: true })
        await Room.findByIdAndUpdate(room_Id, { currentVotes: currentVotesDiscussion }, { new: true, useFindAndModify: true })
        const usersAliveDiscussion = room.users.filter(user => user.live === true)
        console.log(currentVotesDiscussion.length, usersAliveDiscussion.length)
        if(usersAliveDiscussion.length>2){
        if (currentVotesDiscussion.length === usersAliveDiscussion.length) {
          currentVotesDiscussion.sort();

          var maior = null;
          var ocorrenciasMaior = -1;
          
          var contagem = 1;
          for ( var i = 1 ; i <= currentVotesDiscussion.length ; i++ ) {
            if ( i < currentVotesDiscussion.length && currentVotesDiscussion[i] == currentVotesDiscussion[i-contagem] )
              contagem++;
            
            else if ( contagem > ocorrenciasMaior ) {
              maior = currentVotesDiscussion[i-1];
              ocorrenciasMaior = contagem;
            }
          }
          await User.findByIdAndUpdate(maior, { live: false }, { new: true, useFindAndModify: true })
          await Room.findByIdAndUpdate(room_Id, { currentVotes: [], currentPage: "gameHome" }, { new: true, useFindAndModify: true })
          const roomx = await Room.findById(room_Id)
          await roomx.populate('users').execPopulate()
          req.io.emit('playersOnRoom', roomx)
          return res.json(roomx)
          
        }}else{
          const roomFinish = await Room.findByIdAndUpdate(room_Id, { currentVotes: [], currentPage: "gameHome", playing: false}, { new: true, useFindAndModify: true })
          return res.json(roomFinish)
        }
      }
    }
    // await Room.findByIdAndUpdate(room_Id, { currentPage: "gameHome" }, { new: true, useFindAndModify: true })
    // const newRoom = await Room.findById(room_Id)
    // await newRoom.populate('users').execPopulate()
    // req.io.emit('playersOnRoom', newRoom)
    // return res.json(newRoom)

    if (!room) {
      return res.status(401).json({ message: "sala nao encontrada." })
    }

  },

}
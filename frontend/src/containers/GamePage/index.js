import React, { useMemo } from "react";
import { GameMainContainer, HomeContainer, LobbyBody, UserDates, UserDatesTitle, UserInfo, AvatarDiv, InputAvatar } from './styled'
import { TitleLogo, DefaultButton } from '../../style/styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import GameVoc from '../../Components/GameVoc'
import GameCard from '../../Components/GameCard'
import { useEffect } from "react";
import { getProfile } from '../../actions/auth'
import { getRoom, leaveRoom, vote } from '../../actions/room'
import { setRoom } from '../../actions'
import socketio from 'socket.io-client'

const GamePage = (props) => {

  const token = localStorage.getItem('token')
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { token }
  }), [token])

  useEffect(() => {
    socket.on('playersOnRoom', data => {
      props.setRoom(data)
    })
  }, [props.allRooms, socket])

  useEffect(() => {
    props.getProfile()
    props.getRoom(props.match.params.id)
    props.getRoom(props.match.params.id)
  }, [])

  const votePlayer = (votedUser_id) => {
    props.vote(votedUser_id, props.currentRoom._id, props.currentUser.vocation, props.currentRoom.currentPage)
  }

  let titleText
  if (props.currentUser.vocation === "sabotador" && props.currentRoom.currentPage === "gameHome") {
    titleText = <UserInfo>Escolha alguém que você queira fazer ser demitido.</UserInfo>
  } else if (props.currentUser.vocation === "segurança" && props.currentRoom.currentPage === "gameHome") {
    titleText = <UserInfo>Escolha alguém que você gostaria de ajudar a não ser demitido.</UserInfo>
  } else if (props.currentUser.vocation === "ceo" && props.currentRoom.currentPage === "gameHome") {
    titleText = <UserInfo>Escolha alguém que você desconfia que esteja sabotando a empresa.</UserInfo>
  } else if (props.currentUser.vocation === "trabalhador" && props.currentRoom.currentPage === "gameHome") {
    titleText = <UserInfo>Quem você desconfia estar sabotando a empresa.</UserInfo>
  } else {
    titleText = <UserInfo>Discuta com todos e votem em quem vocês desconfiam estar sabotando a empresa para ser demitido.</UserInfo>
  }

  const LeaveGame = () => {
    props.leaveRoom(props.currentRoom._id)
  }

  // useEffect(() => {
  //   const playersLive = props.currentRoom.users && props.currentRoom.users.filter(user => user !== props.currentUser.id).filter(user => user.live)
  //   if (props.currentRoom.currentPage === "gameHome") {
  //     props.goToGamePage(props.currentUser.currentRoom)
  //   }
  // }, [props.currentRoom.currentPage])

  const alivePlayers = props.currentRoom.users && props.currentRoom.users.filter(user => user.live)
  const exist = props.currentRoom.users && alivePlayers.find(currentUserHere => 
    currentUserHere._id == props.currentUser._id
  )
  if (exist !== undefined) {
    return (
      <GameMainContainer>
        <TitleLogo>Trampo</TitleLogo>
        <GameVoc
          id={props.currentUser.id}
          vocation={props.currentUser.vocation}
          username={props.currentUser.username}
        />
        {titleText}
        <HomeContainer>
          {props.currentRoom.users && props.currentRoom.users.filter(user => user._id !== props.currentUser.id).filter(user => user.live).map(user => {
            return <div
              key={user.id}
              onClick={() => votePlayer(user._id)}
            ><GameCard

                id={user.id}
                avatarUrl={user.avatar_url}
                username={user.username}
              /></div>
          })}
        </HomeContainer>
        <DefaultButton style={{ width: "90%" }} onClick={LeaveGame}>Sair</DefaultButton>
      </GameMainContainer>
    )
  } else {
    return (
      <GameMainContainer>
        <TitleLogo>Trampo</TitleLogo>
        <GameVoc
          id={props.currentUser.id}
          vocation={props.currentUser.vocation}
          username={props.currentUser.username}
        />
        <UserInfo>Você morreu, espere o jogo acabar.</UserInfo>
        <HomeContainer>
          
        </HomeContainer>
        <DefaultButton style={{ width: "90%" }} onClick={LeaveGame}>Sair</DefaultButton>
      </GameMainContainer>
    )
  }
}

const mapStateToProps = state => ({
  currentPage: state.router.location.pathname,
  currentUser: state.user.currentProfile,
  currentRoom: state.room.currentRoom,
})

const mapDispatchToProps = dispatch => ({
  goToProfilePage: () => dispatch(push(routes.profile)),
  goToGamePage: () => dispatch(push(routes.game)),
  getProfile: () => dispatch(getProfile()),
  getRoom: (id) => dispatch(getRoom(id)),
  setRoom: (playersRoom) => dispatch(setRoom(playersRoom)),
  leaveRoom: (id) => dispatch(leaveRoom(id)),
  vote: (votedUser_id, room_Id, vocation, page) => dispatch(vote(votedUser_id, room_Id, vocation, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
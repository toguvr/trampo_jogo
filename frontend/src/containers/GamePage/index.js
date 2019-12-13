import React from "react";
import { GameMainContainer, HomeContainer, LobbyBody, UserDates, UserDatesTitle, UserInfo, AvatarDiv, InputAvatar } from './styled'
import { TitleLogo, DefaultButton } from '../../style/styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import GameVoc from '../../Components/GameVoc'
import GameCard from '../../Components/GameCard'
import { useEffect } from "react";
import { getProfile } from '../../actions/auth'
import { getRoom} from '../../actions/room'

const GamePage = (props) => {

  useEffect(() => {
    props.getProfile()
    props.getRoom(props.match.params.id)
  }, [])

  let titleText
  if (props.currentUser.vocation === "sabotador") {
    titleText = <UserInfo>Escolha alguém que você queira fazer ser demitido.</UserInfo>
  } else if (props.currentUser.vocation === "segurança") {
    titleText = <UserInfo>Escolha alguém que você gostaria de ajudar a não ser demitido.</UserInfo>
  } else if (props.currentUser.vocation === "ceo") {
    titleText = <UserInfo>Escolha alguém que você desconfia que esteja sabotando a empresa.</UserInfo>
  } else {
    titleText = <UserInfo>Quem você desconfia estar sabotando a empresa.</UserInfo>
  }

  const playersLive = props.currentRoom.users && props.currentRoom.users.filter(user=>user!==props.currentUser.id).filter(user=>user.live)
  console.log(playersLive)
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
      {props.currentRoom.users && props.currentRoom.users.filter(user=>user.id!==props.currentUser.id).map(user=>{
          return <GameCard
          key={user.id}
          id={user.id}
          avatarUrl={user.avatar_url}
          username={user.username}
          />
        })}
      </HomeContainer>
    </GameMainContainer>
  )
}

const mapStateToProps = state => ({
  currentPage: state.router.location.pathname,
  currentUser: state.user.currentProfile,
  currentRoom: state.room.currentRoom,
})

const mapDispatchToProps = dispatch => ({
  goToProfilePage: () => dispatch(push(routes.profile)),
  getProfile: () => dispatch(getProfile()),
  getRoom: (id) => dispatch(getRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
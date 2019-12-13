import React, { useState, useEffect, useMemo } from "react";
import { MainNavBar, HeaderContainer, ProfileDiv, HomeDiv, FlexTitle, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import PersonOutlined from '@material-ui/icons/PersonOutlined';
import NavBar from "../../Components/NavBar";
import { MainHomeContainer, HomeContainer, LobbyBody, UserDates, UserDatesTitle, UserInfo, AvatarDiv, InputAvatar } from './styled'
import { TitleLogo, DefaultButton } from '../../style/styled'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { getProfile, changeAvatar } from '../../actions/auth';
import { getRoom, leaveRoom,startRoom } from '../../actions/room';
import LobbyCard from '../../Components/LobbyCard'
import socketio from 'socket.io-client'

const LobbyPage = (props) => {




  useEffect(() => {
    const socket = socketio('http://localhost:3333')
    props.getRoom(props.match.params.id)
  }, [])

  useEffect(() => {
    if(props.currentRoom.playing){
      props.goToGamePage(props.currentRoom._id)
    }
  }, [])

  const startGame=() =>{
    props.startRoom(props.currentRoom._id)
  }

  const LeaveGame=() =>{
    props.leaveRoom(props.currentRoom._id)
  }

  return (
    <MainHomeContainer>
      <TitleLogo>Trampo</TitleLogo>
      <UserInfo>Você está na sala de espera, o chefe já vai te chamar.</UserInfo>
      <HomeContainer>
        {props.currentRoom.users && props.currentRoom.users.map(user=>{
          return <LobbyCard
          key={user.id}
          id={user.id}
          avatarUrl={user.avatar_url}
          username={user.username}
          />
        })}
      </HomeContainer>
      {props.currentUser._id === props.currentRoom.admRoom && props.currentRoom.admRoom && props.currentUser._id && <DefaultButton style={{width: "90%"}} onClick={startGame}>Start</DefaultButton>}
      <DefaultButton style={{width: "90%"}} onClick={LeaveGame}>Sair</DefaultButton>
    </MainHomeContainer>
  )
}

const mapStateToProps = state => ({
  currentPage: state.router.location.pathname,
  currentUser: state.user.currentProfile,
  currentRoom: state.room.currentRoom,
})

const mapDispatchToProps = dispatch => ({
  goToProfilePage: () => dispatch(push(routes.profile)),
  goToHomePage: () => dispatch(push(routes.home)),
  goToGamePage: (id) => dispatch(push(`/game/${id}`)),
  getProfile: () => dispatch(getProfile()),
  changeAvatar: (avatar) => dispatch(changeAvatar(avatar)),
  getRoom: (id) => dispatch(getRoom(id)),
  leaveRoom: (id) => dispatch(leaveRoom(id)),
  startRoom: (id) => dispatch(startRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
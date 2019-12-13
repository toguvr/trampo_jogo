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
import { joinRoom } from '../../actions/room';

const ProfilePage = (props) => {


  useEffect(() => {
    props.getProfile()
  }, [])

  const doLogout=() =>{
    window.localStorage.removeItem('token')
    props.goToLoginPage()
  }

  return (
    <MainHomeContainer>
      <TitleLogo>Trampo</TitleLogo>
      <HomeContainer>
        <AvatarDiv id="avatarUrl" style={{ backgroundImage: `url(${props.currentUser.avatar_url})` }}>
          <InputAvatar type="file" onChange={event => props.changeAvatar(event.target.files[0])} />
         {props.currentUser.avatar_url === "http://localhost:3333/files/undefined" || props.currentUser.avatar_url===null ? <PhotoCameraIcon color="primary"/> : null}
        </AvatarDiv>
        <UserDates>
          <UserDatesTitle>Email Cadastrado :</UserDatesTitle>
          <UserInfo>{props.currentUser.email}</UserInfo>
          <UserDatesTitle>Username Cadastrado :</UserDatesTitle>
          <UserInfo>{props.currentUser.username}</UserInfo>
          <UserDatesTitle>Ultima Partida :</UserDatesTitle>
          {props.currentUser.currentRoom ? <UserInfo onClick={()=>props.joinRoom(props.currentUser.currentRoom)}>Em andamento, clique aqui</UserInfo> : <UserInfo>Finalizada</UserInfo>}
        </UserDates>
      </HomeContainer>
      <DefaultButton style={{width:"90%"}} onClick={doLogout}>Logout</DefaultButton>
      <NavBar />
    </MainHomeContainer>
  )
}
const mapStateToProps = state => ({
  currentPage: state.router.location.pathname,
  currentUser: state.user.currentProfile,
})

const mapDispatchToProps = dispatch => ({
  goToProfilePage: () => dispatch(push(routes.profile)),
  goToLoginPage: () => dispatch(push(routes.login)),
  getProfile: () => dispatch(getProfile()),
  changeAvatar: (avatar) => dispatch(changeAvatar(avatar)),
  joinRoom: (id) => dispatch(joinRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
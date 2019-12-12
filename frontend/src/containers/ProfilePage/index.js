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

const ProfilePage = (props) => {


  useEffect(() => {
    props.getProfile()
  }, [])

  const doLogout=() =>{
    window.localStorage.removeItem('token')
  }

  return (
    <MainHomeContainer>
      <TitleLogo>Trampo</TitleLogo>
      
      <HomeContainer>
        <AvatarDiv id="avatarUrl" style={{ backgroundImage: `url(${props.currentUser.avatar_url})` }}>
          <InputAvatar type="file" onChange={event => props.changeAvatar(event.target.files[0])} />
         {props.currentUser.avatar_url==="http://localhost:3333/files/undefined" && <PhotoCameraIcon/>}
        </AvatarDiv>
        <UserDates>
          <UserDatesTitle>Email Cadastrado :</UserDatesTitle>
          <UserInfo>{props.currentUser.email}</UserInfo>
          <UserDatesTitle>Username Cadastrado :</UserDatesTitle>
          <UserInfo>{props.currentUser.username}</UserInfo>
        </UserDates>
      </HomeContainer>
      <DefaultButton onClick={doLogout}>Logout</DefaultButton>
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
  goToHomePage: () => dispatch(push(routes.home)),
  getProfile: () => dispatch(getProfile()),
  changeAvatar: (avatar) => dispatch(changeAvatar(avatar)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
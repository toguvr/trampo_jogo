import React, {useEffect} from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import NavBar from "../../Components/NavBar";
import LobbyName from "../../Components/LobbyName";
import { MainHomeContainer, HomeContainer, LobbyBody, MainLobbyBar, HomeDiv, ProfileDiv } from './styled'
import { TitleLogo, DefaultButton, ErrorMsg } from '../../style/styled'
import { getRooms, createRoom } from '../../actions/room'

const Home = (props) => {
    useEffect(()=>{
        props.getRooms()
    },[])

    const createOneRoom=()=>{
        props.createRoom()
    }

    return (
        <MainHomeContainer>
            <TitleLogo>Trampo</TitleLogo>
            <HomeContainer>
                {props.homeMsg? <ErrorMsg>{props.homeMsg}</ErrorMsg> : null}
                <LobbyBody>
                    <MainLobbyBar>
                        <HomeDiv>Salas:</HomeDiv>
                        <ProfileDiv>Jogadores:</ProfileDiv>
                    </MainLobbyBar>
                   {props.allRooms.filter(lobby=>lobby.playing===false).map((lobby,index)=>{
                       return <LobbyName 
                       key={index}
                       id={lobby._id}
                       name={lobby.roomName}
                       nPlayers={lobby.users.length}
                       />
                   })}
                </LobbyBody>
                <DefaultButton onClick={createOneRoom}>Criar Sala</DefaultButton>
            </HomeContainer>
            <NavBar />
        </MainHomeContainer>
    );
}

const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
    allRooms: state.room.roomList,
    homeMsg: state.requestMsg.homeMsg,
})

const mapDispatchToProps = dispatch => ({
    getRooms: () => dispatch(getRooms()),
    createRoom: () => dispatch(createRoom()),
    goToHomePage: () => dispatch(push(routes.home)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

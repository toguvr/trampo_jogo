import React, {useEffect, useMemo} from "react";
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
import { setRoomList } from '../../actions'
import { getProfile } from '../../actions/auth'
import socketio from 'socket.io-client'

const Home = (props) => {
    useEffect(()=>{
        props.getProfile()
        props.getRooms()

    },[])

    const token = localStorage.getItem('token')
    const socket = useMemo(()=> socketio('http://localhost:3333',{
        query: {token}
    }),[token])

    useEffect(()=>{

        socket.on('updateRooms', data=>{
            props.setRoomList(data)
        })

    },[props.allRooms, socket])

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
                   {props.allRooms.filter(lobby=>lobby.playing===false).filter(pNumber=>pNumber.users.length>0).map((lobby,index)=>{
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
    getProfile: () => dispatch(getProfile()),
    createRoom: () => dispatch(createRoom()),
    goToHomePage: () => dispatch(push(routes.home)),
    setRoomList: (list) => dispatch(setRoomList(list)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

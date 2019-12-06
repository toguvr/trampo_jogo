import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import QuestionCard from "../../Components/QuestionCard";
import {MainHomeContainer, TitleLogo, InputName, LobbyBody, LobbyName, CreateLobby} from './styled'

const Home=(props)=> {

return (
    <MainHomeContainer>
        <TitleLogo>Trampo</TitleLogo>
        <InputName type="text" placeholder="Username"/>
        <LobbyBody>
        <LobbyName>Sala1</LobbyName>
        <LobbyName>Sala2</LobbyName>
        <LobbyName>Sala3</LobbyName>
        <LobbyName>Sala3</LobbyName>
        <LobbyName>Sala3</LobbyName>
        <LobbyName>Sala3</LobbyName>
        <LobbyName>Sala3</LobbyName>
        </LobbyBody>
        <CreateLobby>Criar Sala</CreateLobby>
    </MainHomeContainer>
);
}

export default Home;

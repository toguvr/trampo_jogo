import styled from 'styled-components'

export const MainHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background: #F5F5F5;
    align-items:center;
    justify-content:space-evenly;
`

export const TitleLogo = styled.h1`
    @import url('https://fonts.googleapis.com/css?family=Henny+Penny&display=swap');
    font-family: 'Henny Penny', cursive;
`

export const LobbyBody = styled.div`
    width:80%;
    height:250px;
    background: white;
    overflow-y: scroll;
    border:1px solid gray;
    border-radius:30px;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding-bottom:20px;
`

export const LobbyName = styled.div`
    width:80%;
    height:30px;
    background: white;
    border: 1px solid black;
    margin-top:20px;
`

export const CreateLobby = styled.button`
    width:80%;
    height:30px;
    background: white;
    border: 1px solid black;
`

export const InputName = styled.input`
    width:80%; 
    height:30px; 
    text-align:center;

    ::placeholder{
        text-align:center;
    }
`
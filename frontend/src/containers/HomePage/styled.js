import styled from 'styled-components'

export const MainHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background: #F5F5F5;
    align-items:center;
`

export const TitleLogo = styled.h1`
    @import url('https://fonts.googleapis.com/css?family=Sigmar+One&display=swap');
    font-family: 'Sigmar One', cursive;
    font-size: 40px;
    color: #801CDE;
`

export const LobbyBody = styled.div`
    width:90%;
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

export const HomeDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
`

export const ProfileDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height: 100%;
`

export const MainLobbyBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width: 100%;
    background:#f5f5f5;
    border:1px lightgray solid;
    margin-bottom:5px;
`

export const LobbyName = styled.div`
    width:80%;
    height:30px;
    background: white;
    border: 1px solid black;
    margin-top:20px;
`

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    width: 90%;
    align-items:center;
    justify-content:space-evenly;
`

export const CreateLobby = styled.button`
    width:80%;
    height:30px;
    background: #801CDE;
    border: 1px solid black;
    box-shadow: 0 2px 5px rgba(0,0,0,0.8);
    color: white;
    font-weight:bold;
    :active{
        position: relative;
        top: 1px;
    }
    :focus{
        outline: none;
    }
`

export const InputName = styled.input`
    width:80%; 
    height:30px; 
    text-align:center;

    ::placeholder{
        text-align:center;
    }
`
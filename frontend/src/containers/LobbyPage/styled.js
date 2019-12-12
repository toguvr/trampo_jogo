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

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    width: 100%;
    align-items:center;
`

export const UserDates = styled.div`
    padding:8px;
    background: rgb(238, 238, 238);
    display:flex;
    flex-direction: column;
    width: 100%;
`

export const AvatarDiv = styled.label`
    background: #eeeeee;
    display:flex;
    background-size: cover;
    cursor:pointer;
    border: 1px dashed black;
    border-radius:50%;
    width:100px;
    height:100px;
    margin-bottom: 15px;
    justify-content:center;
    align-items:center;
`

export const InputAvatar=styled.input`
    display: none;

    :focus{
        outline:none;
    }
`

export const UserDatesTitle = styled.span`
    color:rgb(184, 184, 184);
    margin-top:5px;
`

export const UserInfo = styled.span`
    margin-bottom:5px;
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
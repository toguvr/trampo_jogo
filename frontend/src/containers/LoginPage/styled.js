import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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
    @import url('https://fonts.googleapis.com/css?family=Sigmar+One&display=swap');
    font-family: 'Sigmar One', cursive;
    font-size: 55px;
    color: #801CDE;
    margin:0;
    text-shadow:2px 2px rgba(0,0,0,0.8);
`

export const LobbyBody = styled.div`
    width:80%;
    height:250px;
    background: white;
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
    width:100%;
    height:30px;
    background: #801CDE;
    border: 1px solid black;
    box-shadow: 0 2px 5px rgba(0,0,0,0.8);
    color: white;
    font-weight:bold;
    margin-bottom:8px;

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

export const TextAccount = styled.span`
font-size: 14px;
`

export const FormBody = styled.form`
    display:flex;
    flex-direction:column;
`

export const TitlePage = styled.span`
background: #eabebe;
color: #812c3a;
border: 1px solid #812c3a;
text-align:center;
margin-bottom: 8px;
padding:1px;
`

export const FooterButton = styled.div`
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
`

export const TextClick = styled.span`
font-size: 14px;
color: #801CDE;
text-decoration: underline;

:hover{
    cursor:pointer;
}
`

export const TextFieldStyled = styled(TextField)`
div{
margin-bottom: 10px;
}
`

export const FormControlStyled = styled(FormControl)`
div :last-child{
    margin:0;
}
div{
    margin-bottom: 16px;
}

`


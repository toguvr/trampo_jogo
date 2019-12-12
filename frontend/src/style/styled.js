
import styled from 'styled-components'

export const TitleLogo = styled.h1`
    @import url('https://fonts.googleapis.com/css?family=Sigmar+One&display=swap');
    font-family: 'Sigmar One', cursive;
    font-size: 55px;
    color: #801CDE;
    margin:0;
    text-shadow:2px 2px rgba(0,0,0,0.8);
`
export const DefaultButton = styled.button`
    width:100%;
    height:30px;
    background: #801CDE;
    border: 1px solid black;
    box-shadow: 0 2px 5px rgba(0,0,0,0.8);
    color: white;
    font-weight:bold;
    margin-bottom:8px;
    padding:5px 0 ;

:active{
    position: relative;
    top: 1px;
}
:focus{
    outline: none;
}
`

export const ErrorMsg = styled.span`
background: #eabebe;
color: #812c3a;
border: 1px solid #812c3a;
text-align:center;
margin-bottom: 8px;
padding:1px;
`

export const TitlePage = styled.span`
background: #eabebe;
color: #812c3a;
border: 1px solid #812c3a;
text-align:center;
margin-bottom: 8px;
padding:1px;
`
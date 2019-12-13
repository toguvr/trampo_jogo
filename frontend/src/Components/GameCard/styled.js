import styled from 'styled-components'

export const MainLobbyCard = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:space-evenly;
    width: 90%;
    background:#f5f5f5;
    border:4px #801CDE solid;
    border-radius: 10px;
    box-shadow: 2px 2px 5px gray;
    margin-bottom:5px;
    padding:8px;
    cursor:pointer;
`

export const Avatar = styled.img`
    background: #eeeeee;
    display:flex;
    background-size: cover;
    border: 2px solid #801CDE;
    border-radius:50%;
    width:100px;
    height:100px;
    margin-bottom: 15px;
    justify-content:center;
    align-items:center;
`

export const MainBodyLobbyBar = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;;
    width: 100%;
`

export const HomeDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
`

export const NameProfile = styled.span`
    max-width: 10ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ProfileDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 95%;
`
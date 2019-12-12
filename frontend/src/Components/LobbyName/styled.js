import styled from 'styled-components'

export const MainLobbyBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width: 100%;
    background:#f5f5f5;
    border:1px lightgray solid;
    margin-bottom:5px;
`

export const LobbyBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width: 100%;
    background:#801CDE;
    color: white;
    border:1px white solid;
    margin-bottom:5px;
    padding: 5px 0;
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

export const NameRoom = styled.span`
    max-width: 15ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ProfileDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height: 100%;
`
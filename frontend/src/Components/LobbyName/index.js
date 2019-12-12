import React from "react";
import { MainLobbyBar, MainBodyLobbyBar, LobbyBar, ProfileDiv, HomeDiv, NameRoom, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import { joinRoom } from '../../actions/room'

const LobbyName = (props) => {
const goToLobby=()=>{
    props.joinRoom(props.id)
}
    return (
            <LobbyBar onClick={goToLobby}>
                <HomeDiv>Sala {props.name}</HomeDiv>
                <ProfileDiv><PeopleOutlined/> {props.nPlayers}</ProfileDiv>
            </LobbyBar>
    )
}
const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
    goToProfilePage: () => dispatch(push(routes.profile)),
    joinRoom: (id) => dispatch(joinRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LobbyName)
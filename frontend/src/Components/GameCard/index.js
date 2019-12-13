import React from "react";
import { MainLobbyCard, Avatar, LobbyBar, ProfileDiv, HomeDiv, NameProfile, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { joinRoom } from '../../actions/room'

const GameCard = (props) => {

    return (
        <MainLobbyCard>
            <Avatar src={props.avatarUrl && props.avatarUrl !== "http://localhost:3333/files/undefined" ? props.avatarUrl : "http://localhost:3333/files/avatar-1576155439617.gif"} alt="profile image" />
            <ProfileDiv><AssignmentInd color="primary" /><NameProfile>{props.username}</NameProfile> </ProfileDiv>
        </MainLobbyCard>
    )
}
const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
    goToProfilePage: () => dispatch(push(routes.profile)),
    joinRoom: (id) => dispatch(joinRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameCard)
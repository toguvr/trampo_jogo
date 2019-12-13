import React from "react";
import { MainLobbyCard, Avatar, LobbyBar, ProfileDiv, NameVoc, NameProfile, TitleAvatar, ClassAvatar, AvatarDiv } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { joinRoom } from '../../actions/room'

const LobbyCard = (props) => {

    return (
        <MainLobbyCard>
            <AvatarDiv>
                <Avatar src={props.avatarUrl && props.avatarUrl !== "http://localhost:3333/files/undefined" ? props.avatarUrl : "http://localhost:3333/files/avatar-1576155439617.gif"} alt="profile image" />
            </AvatarDiv>
            <ProfileDiv><NameProfile>Nome: {props.username}</NameProfile><NameProfile >Cargo: <strong>{props.vocation}</strong></NameProfile> </ProfileDiv>
        </MainLobbyCard>
    )
}
const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
    currentProfile: state.user.currentProfile,
})

const mapDispatchToProps = dispatch => ({
    goToProfilePage: () => dispatch(push(routes.profile)),
    joinRoom: (id) => dispatch(joinRoom(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCard)
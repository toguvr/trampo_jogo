import React from "react";
import { MainLobbyCard, Avatar, LobbyBar, ProfileDiv, HomeDiv, NameProfile, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { joinRoom, vote } from '../../actions/room'

const GameCard = (props) => {

    const votePlayer=(votedUser_id)=>{
        props.vote(votedUser_id, props.currentRoom._id, props.currentUser.vocation)
      }

    return (
        <MainLobbyCard onClick={()=>votePlayer(props.id)}>
            <Avatar src={props.avatarUrl && props.avatarUrl !== "http://localhost:3333/files/undefined" ? props.avatarUrl : "http://localhost:3333/files/avatar-1576155439617.gif"} alt="profile image" />
            <ProfileDiv><AssignmentInd color="primary" /><NameProfile>{props.username}</NameProfile> </ProfileDiv>
        </MainLobbyCard>
    )
}
const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
    currentUser: state.user.currentProfile,
    currentRoom: state.room.currentRoom,
})

const mapDispatchToProps = dispatch => ({
    goToProfilePage: () => dispatch(push(routes.profile)),
    joinRoom: (id) => dispatch(joinRoom(id)),
    vote: (votedUser_id, room_Id, vocation) => dispatch(vote(votedUser_id, room_Id, vocation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameCard)
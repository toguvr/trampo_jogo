import React from "react";
import { MainNavBar, HeaderContainer, ProfileDiv, HomeDiv, FlexTitle, TitleAvatar, ClassAvatar, QuestionTitle } from './styled'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../../containers/Router"
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import PersonOutlined from '@material-ui/icons/PersonOutlined';

const NavBar = (props) => {
    const changePage=()=>{
        if(props.currentPage==="/"){
            props.goToProfilePage()
        }else{
            props.goToHomePage()
        }
    }
    return (
        <MainNavBar>
            <HomeDiv onClick={props.currentPage==="/profile" && changePage}><HomeOutlined color={props.currentPage==="/" ? "primary" : "disabled"} fontSize="large"/></HomeDiv>
            <ProfileDiv onClick={props.currentPage==="/" && changePage} ><PersonOutlined color={props.currentPage==="/profile" ? "primary" : "disabled"} fontSize="large"/></ProfileDiv>
        </MainNavBar>
    )
}
const mapStateToProps = state => ({
    currentPage: state.router.location.pathname,
  })

  const mapDispatchToProps = dispatch => ({
    goToProfilePage: () => dispatch(push(routes.profile)),
    goToHomePage: () => dispatch(push(routes.home)),
  })

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)
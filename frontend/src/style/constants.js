import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from '../containers/Router';
import { connect } from "react-redux";
import { setErrorMessageAction } from "../actions";

const mapStateToProps = state => ({
    actualProfile: state.requests.actualProfile,
    actualPage: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
    setErrorMessageAction: (msg)=>dispatch(setErrorMessageAction(msg)),
})

export const Authenticator = connect(null, mapDispatchToProps)((props) => {
    
    const token = window.localStorage.getItem('token')

    if (!token) {
        props.setErrorMessageAction("Usuário não autenticado")
        return (<Redirect to={{ pathname: routes.login, state: { from: props.location } }} />)
    } else {
        return props.children
    }
})

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Authenticator>
            <Component {...props} />
        </Authenticator>
    )} />
)


import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { MainHomeContainer, TextClick, FooterButton, TextAccount, FormBody, TextFieldStyled, FormControlStyled } from './styled'
import { TitleLogo, DefaultButton, TitlePage } from '../../style/styled'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { signUp } from '../../actions/auth'

class SingUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            showPassword: false
        };
    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleClickShowPassword = event => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    doSignUp = (event) => {
        event.preventDefault()
        const { username, email, password } = this.state;
        const { signUp } = this.props;
        signUp(username, email, password)

    }

    render() {
        const { username, password, email, showPassword } = this.state;
        const { goToLoginPage, signUpMsg } = this.props;

        return (
            <MainHomeContainer>
                <TitleLogo>Trampo</TitleLogo>
                
                <FormBody onSubmit={this.doSignUp} autocomplete="off">
                {signUpMsg ? <TitlePage>{signUpMsg}</TitlePage> : null}
                    <TextFieldStyled
                        name="username"
                        id="outlined-basic"
                        label="Username"
                        onChange={this.handleFieldChange}
                        value={username}
                        variant="outlined"
                    />
                    <TextFieldStyled
                        name="email"
                        id="outlined-basic"
                        label="Email"
                        onChange={this.handleFieldChange}
                        value={email}
                        variant="outlined"
                        type="email"
                    />
                    <FormControlStyled variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name="password"
                            onChange={this.handleFieldChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        color="primary"
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControlStyled>

                    <FooterButton>
                        <DefaultButton >Registrar</DefaultButton>
                        <TextAccount>Já tem conta? <TextClick onClick={goToLoginPage}>Login aqui.</TextClick></TextAccount>
                    </FooterButton>
                </FormBody>
            </MainHomeContainer>
        );
    }
}

const mapStateToProps = state => ({
    signUpMsg: state.requestMsg.signUpMsg,
  })

const mapDispatchToProps = dispatch => ({
    goToLoginPage: () => dispatch(push(routes.login)),
    signUp: (username, email, password) => dispatch(signUp(username, email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingUpPage);

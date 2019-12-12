import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { MainHomeContainer, TextClick, FooterButton, TextAccount, FormBody, TextFieldStyled, FormControlStyled, TitlePage } from './styled'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { login } from '../../actions/auth'
import { TitleLogo, DefaultButton } from '../../style/styled'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  doLogin = (event) => {
    event.preventDefault()
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password)

  }

  render() {
    const { username, password, showPassword } = this.state;
    const { goToSignUpPage, loginMsg } = this.props;

    return (
      <MainHomeContainer>
        <TitleLogo>Trampo</TitleLogo>
        <FormBody onSubmit={this.doLogin} autocomplete="off">
          {loginMsg ? <TitlePage>{loginMsg}</TitlePage> : null}
          <TextFieldStyled name="username"
            id="outlined-basic"
            label="Username"
            onChange={this.handleFieldChange}
            value={username}
            variant="outlined"
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
            <DefaultButton >Login</DefaultButton>
            <TextAccount>Novato no trampo? <TextClick onClick={goToSignUpPage}>Clique aqui.</TextClick></TextAccount>
          </FooterButton>
        </FormBody>
      </MainHomeContainer>
    );
  }
}

const mapStateToProps = state => ({
  loginMsg: state.requestMsg.loginError,
})

const mapDispatchToProps = dispatch => ({
  goToSignUpPage: () => dispatch(push(routes.signup)),
  login: (username, password) => dispatch(login(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

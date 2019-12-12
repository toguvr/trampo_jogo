import axios from 'axios'
import { routes } from "../containers/Router";
import { push } from "connected-react-router";
import { setErrorMessageAction, setErrorSignUpMessageAction, setCurrentProfile } from "./";

const baseURL = 'http://localhost:3333'

export const signUp = (username, email, password) => async (dispatch) => {
    dispatch(setErrorSignUpMessageAction(null))
    const body = {
        username, 
        email, 
        password
    }

    const response = await axios.post(`${baseURL}/sessions/signup`, body)

    window.localStorage.setItem('token', response.data.token);

    if (response.data.token) {
        dispatch(push(routes.home))
    }else{
        dispatch(setErrorSignUpMessageAction(response.data.message))
    }
}

export const login = (username, password) => async (dispatch) => {
    dispatch(setErrorMessageAction(null))
    const body = {
        username, 
        password
    }

    const response = await axios.post(`${baseURL}/sessions/login`, body)

    window.localStorage.setItem('token', response.data.token);

    if (response.data.token) {
        dispatch(push(routes.home))
    }else{
        dispatch(setErrorMessageAction(response.data.message))
    }
}

export const changeAvatar = (avatar) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const body = new FormData()
    body.append('avatar', avatar)

    const response = await axios.put(`${baseURL}/avatar`, body,{
        headers:{
            auth: token
        }
    })

    if (response.status === 200) {
        dispatch(getProfile())
    }
}

export const getProfile = () => async (dispatch) => {

    const token = localStorage.getItem('token')

    const response = await axios.get(`${baseURL}/avatar`, {
        headers:{
            auth: token
        }
    })

    if (response.status === 200) {
        dispatch(setCurrentProfile(response.data))
    }
}

import axios from 'axios'
import { routes } from "../containers/Router";
import { push } from "connected-react-router";
import { setErrorMessageAction, setErrorSignUpMessageAction, setRoomList, setRoom, setHomeError } from "./";

const baseURL = 'http://localhost:3333'

export const getRooms = () => async (dispatch) => {
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/rooms`, {
        headers: {
            auth: token
        }
    })
    dispatch(setRoomList(response.data))

}

export const joinRoom = (id) => async (dispatch) => {
    dispatch(setHomeError(null))
    const token = window.localStorage.getItem('token');

    const response = await axios.put(`${baseURL}/rooms/${id}/join`, null, {
        headers: {
            auth: token
        }
    })
    if (!response.data.message) {
        dispatch(setRoom(response.data))
        dispatch(push(routes.lobby))
    }else{
        dispatch(setHomeError(response.data.message))
    }
}

export const createRoom = () => async (dispatch) => {
    dispatch(setHomeError(null))
    const token = window.localStorage.getItem('token');

    const response = await axios.post(`${baseURL}/room/create`, null, {
        headers: {
            auth: token
        }
    })
    if (response.data.message) {
        dispatch(setHomeError(response.data.message))
    }else{
        dispatch(push(routes.lobby))
    }
}

import axios from 'axios'
import { routes } from "../containers/Router";
import { push } from "connected-react-router";
import { setErrorMessageAction, setErrorSignUpMessageAction, setRoomList, setRoom, setHomeError, setRoomInfo } from "./";

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

export const getRoom = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token');

    const response = await axios.get(`${baseURL}/room/${id}`, {
        headers: {
            auth: token
        }
    })
    dispatch(setRoom(response.data))
}

export const joinRoom = (id) => async (dispatch) => {
    dispatch(setHomeError(null))
    const token = window.localStorage.getItem('token');

    const response = await axios.put(`${baseURL}/rooms/${id}/join`, null, {
        headers: {
            auth: token
        }
    })

    if (response.data.admRoom) {
        dispatch(setRoom(response.data))
        dispatch(getRooms())
        dispatch(push(`/lobby/${id}`))
    } else if (response.data.message === "você já está nesta sala") {
        dispatch(getRoom(id))
        dispatch(push(`/lobby/${id}`))
        dispatch(getRooms())
        dispatch(setHomeError(response.data.message))
    } else {
        dispatch(setHomeError(response.data.message))
    }
}

export const leaveRoom = (id) => async (dispatch) => {
    dispatch(setHomeError(null))
    const token = window.localStorage.getItem('token');

    const response = await axios.put(`${baseURL}/rooms/${id}/leave`, null, {
        headers: {
            auth: token
        }
    })

    if (response.data.admRoom) {
        dispatch(getRoom(id))
        dispatch(push(routes.home))
    } else if (response.data.message === "usuario nao está na sala") {
        dispatch(getRoom(id))
        dispatch(push(routes.home))
    } else {
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
    if (!response.data.message) {
        dispatch(setRoom(response.data))
        dispatch(getRooms())
        dispatch(push(`/lobby/${response.data._id}`))
    } else {
        dispatch(setHomeError(response.data.message))
    }
}

export const startRoom = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token');

    const response = await axios.put(`${baseURL}/rooms/${id}/start`, null, {
        headers: {
            auth: token
        }
    })
    if (!response.data.message) {
        dispatch(setRoom(response.data))
        dispatch(push(`/game/${id}`))
    } else {
        dispatch(setHomeError(response.data.message))
    }
}

export const vote = (votedUser_id, room_Id, vocation, page) => async (dispatch) => {

    const token = window.localStorage.getItem('token');

    const body = {
        votedUser_id, 
        room_Id, 
        vocation,
        page,
    }

    const response = await axios.put(`${baseURL}/vote`, body, {
        headers: {
            auth: token
        }
    })
    if (!response.data.message) {
        dispatch(setRoom(response.data))
        dispatch(push(`/game/${room_Id}`))
    } else {
        dispatch(setHomeError(response.data.message))
    }
}
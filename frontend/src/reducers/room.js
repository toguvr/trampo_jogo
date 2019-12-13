const initialState = {
    roomList: [],
    currentRoom:{},
    roomInfo:{},
}

const room = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ROOM_LIST":
            return { ...state, roomList: action.payload.listRoom }
        case "SET_ROOM":
            return { ...state, currentRoom: action.payload.currentRoom }
        case "SET_ROOM_INFO":
            return { ...state, roomInfo: action.payload.currentRoomInfo }
        default:
            return state
    }
}

export default room
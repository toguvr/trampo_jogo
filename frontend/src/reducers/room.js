const initialState = {
    roomList: [],
    currentRoom:{},
}

const room = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ROOM_LIST":
            return { ...state, roomList: action.payload.listRoom }
        case "SET_ROOM":
            return { ...state, currentRoom: action.payload.currentRoom }
        default:
            return state
    }
}

export default room
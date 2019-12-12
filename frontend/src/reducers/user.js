const initialState = {
    currentProfile:{}
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return { ...state, currentProfile: action.payload.currentProfile }
        case "SET_ROOM":
            return { ...state, currentRoom: action.payload.currentRoom }
        default:
            return state
    }
}

export default user
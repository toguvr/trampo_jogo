const initialState = {
    currentProfile:{}
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return { ...state, currentProfile: action.payload.currentProfile }
        default:
            return state
    }
}

export default user
const initialState = {
    loginError: false,
    signUpMsg: false,
    homeMsg: false,
}

const requestMsg = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOGIN_MESSAGE":
            return { ...state, loginError: action.payload.message }
        case "SET_SIGNUP_MESSAGE":
            return { ...state, signUpMsg: action.payload.message }
        case "SET_HOME_MESSAGE":
            return { ...state, homeMsg: action.payload.message }
        default:
            return state
    }
}

export default requestMsg
export const setErrorMessageAction = message => {
    return {
        type: 'SET_LOGIN_MESSAGE',
        payload: {
            message
        }
    };
};

export const setErrorSignUpMessageAction = message => {
    return {
        type: 'SET_SIGNUP_MESSAGE',
        payload: {
            message
        }
    };
};

export const setHomeError = message => {
    return {
        type: 'SET_HOME_MESSAGE',
        payload: {
            message
        }
    };
};

export const setRoomList = listRoom => {
    return {
        type: 'SET_ROOM_LIST',
        payload: {
            listRoom
        }
    };
};

export const setRoom = currentRoom => {
    return {
        type: 'SET_ROOM',
        payload: {
            currentRoom
        }
    };
};

export const setRoomInfo = currentRoomInfo => {
    return {
        type: 'SET_ROOM_INFO',
        payload: {
            currentRoomInfo
        }
    };
};

export const setCurrentProfile = currentProfile => {
    return {
        type: 'SET_PROFILE',
        payload: {
            currentProfile
        }
    };
};
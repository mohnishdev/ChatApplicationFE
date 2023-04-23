import ActionType from "../Actions/ActionType/ActionType"

const LoginuserData = (state = "" , action) => {
    switch (action.type) {
    case ActionType.LOGIN_USER:
        return {
            ...state,
            userData: action.payload
        }

    default: return state
    }
}

export default LoginuserData
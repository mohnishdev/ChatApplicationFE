import ActionType from "./ActionType/ActionType"
export const loginuserSuccesss = res => {
    return {
        type: ActionType.LOGIN_USER,
        payload: res
    }
}

export const registerSuccess = res => {
    return {
        type: ActionType.REGISTER_USER,
        payload: res
    }
}

export const userProfileAction = res => {
    return {
        type : ActionType.USER_PROFILE,
        payload:res
    }
}

export const contactsAction = res => {
    return {
        type: ActionType.CONTACTS,
        payload: res
    }
}

export const conversationAction = res => {
    return {
        type :ActionType.CONVERSATIONSTART,
        payload: res
    }
}


export const getMessageAction = res => {
    return {
        type : ActionType.GET_MESSAGE,
        payload:res
    }
}

export const sendMessageAction = res => {
    return{
        type:ActionType.SEND_MESSAGE,
        payload:res
    }
}

export const deleteMessageAction = res => {
    return{
        type :ActionType.DELETE_MESSAGE,
        payload:res
    }
} 

export const editMessageAction = res => {
    return {
        type :ActionType.EDIT_MESSAGE,
        payload:res
    }
}
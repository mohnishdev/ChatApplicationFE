import ActionType from "../Actions/ActionType/ActionType"

const ContactReducer = (state = "" , action) => {
    // console.log(action , "action");
    switch (action.type) {
    case ActionType.CONTACTS:
        return {
            ...state,
            userData: action.payload
        }

    default: return state
    }
}

export default ContactReducer
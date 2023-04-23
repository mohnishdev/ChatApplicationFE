import ActionType  from "../Actions/ActionType/ActionType";
// const InitialState = {
//         conversatinId:"" , 
//         currentChatuserId:"",
//         latestMessageSender : "" ,
//         online: false
//     }

const SelectUserForChatReducer = (state = "", action) => {
    switch(action.type){
        case ActionType.CONVERSATIONSTART:
            return{
                ...state,
                conversation: action.payload
            }
            default: return state
    }


}

export default SelectUserForChatReducer
import ActionType from "../Actions/ActionType/ActionType";

const InitialState ={
    AllMessage : []
}

const MessageReducer = (state = InitialState , action) =>{
    switch(action.type){
        case ActionType.GET_MESSAGE:
            return{
                ...state,
                AllMessage:action.payload
            }
            default: return  state
    }
}

export default MessageReducer
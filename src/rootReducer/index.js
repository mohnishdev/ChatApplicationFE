import { combineReducers } from "redux";
import ContactReducer from "../Reducers/ContactReducer";
import LoginuserData from "../Reducers/LoginUserData";
import MessageReducer from "../Reducers/MessageReducer";
import SelectUserForChatReducer from "../Reducers/SelectUserForChatReducer";

const rootReducer = combineReducers({
   LoginuserData: LoginuserData,
   ContactDetails:ContactReducer,
   SelectUserForChat : SelectUserForChatReducer,
   Message:MessageReducer,
})

export default rootReducer
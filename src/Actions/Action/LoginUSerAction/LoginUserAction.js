import LoginUser from "../../../Services/LoginUser/LoginUser";
import { loginuserSuccesss } from "../../index";

export const LoginuserAction = (user) => async (dispatch) =>{
    return LoginUser(user).then(
            responce => {
                return dispatch(loginuserSuccesss(responce))
            },error =>{
                console.log(error);
            }
        )  
}
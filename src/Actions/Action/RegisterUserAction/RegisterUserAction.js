import RegisterUser from "../../../Services/RegisterUser.js/RegisterUser";
import { registerSuccess } from "../../index";

export const RegisteruserAction = (user) => async (dispatch) =>{
    return RegisterUser(user).then(
            responce => {
                return dispatch(registerSuccess(responce))
            },error =>{
                console.log(error);
            }
        )  
}
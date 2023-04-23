import { sendMessageAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"
const SendMessageService = (formData) => async dispatch => 
{
    console.log(formData , "foooooooo")
    const responce = await fetch(`${BaseURL}/api/addmsg`, {
        method: "POST",
        body: formData
    })
    console.log(formData , "formData");
   const  result = await responce.json()
   console.log(result);
   return dispatch(sendMessageAction(result))
}

export default SendMessageService
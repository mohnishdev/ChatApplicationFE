import { getMessageAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"
const GetMessageService =  (Ids)  => async dispatch => {
    // console.log(Ids , "idssss");
    const  responce = await fetch(`${BaseURL}/api/getmsg`, {
        method: "POST",
        body: JSON.stringify({ from: Ids.from, to: Ids.to, conversationID: Ids.conversationID, latestMessageSender: Ids.latestMessageSender }),
        headers: {
            "Content-Type": "application/json"
        },
    })
   const  result = await responce.json()
//    console.log(result , "result message");
   return dispatch(getMessageAction(result))
    
}

export default GetMessageService
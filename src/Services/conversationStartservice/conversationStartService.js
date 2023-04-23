import { BaseURL } from "../../common/BaseURL/BaseURL";
import { conversationAction } from "../../Actions";

const conversationStartService =  (member) => async (disptach) => {
    const responce = await fetch( `${BaseURL}/api/conversation`, {
        method: "POST",
        body: JSON.stringify({ from: member.from, to: member.to }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const result = await responce.json()
    const current_Chat_user = { conversatinId: result.data._id, currentChatuserId: result.data}
    return disptach(conversationAction(current_Chat_user))

}

export default conversationStartService
import { deleteMessageAction, getMessageAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"

const DeleteMessageService = (Id) => async dispatch =>{
    let response = await fetch(`${BaseURL}/api/deletemassege/${Id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const result = response.json()

    return dispatch(deleteMessageAction(result))
}

export default DeleteMessageService
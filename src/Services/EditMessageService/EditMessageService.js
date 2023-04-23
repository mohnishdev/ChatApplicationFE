import { editMessageAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"

const EditMessageService = (MESSAGE) => async dispatch => {
    let responce = await fetch(`${BaseURL}/api/editmessage/${MESSAGE.ID}`, {
        method: "PUT",
        body: JSON.stringify({
            message: MESSAGE.msg
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    const result = await responce.json()
    // console.log(responce , "resuvcvbnm");
    return dispatch(editMessageAction(result)) 
}

export default EditMessageService
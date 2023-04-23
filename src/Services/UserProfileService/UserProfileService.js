import { userProfileAction } from "../../Actions";
import { BaseURL } from "../../common/BaseURL/BaseURL";

const UserProfileService = (formData , ID) => async dispatch => {
    const Updatedetails = await fetch(`${BaseURL}/api/auth/updateUser/${ID}`, {
        // const Updatedetails = await fetch(`http://localhost:8000/api/${user.id}`, {
        method: 'PUT',
        body: formData,

    })
    const result = await Updatedetails.json()

    return dispatch(userProfileAction(result))
}

export default UserProfileService
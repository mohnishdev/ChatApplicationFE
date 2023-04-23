import { contactsAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"

const contactService =  (id) => async (dispatch) => {
    const data = await fetch(`${BaseURL}/api/conversatin/${id}`, {
        method: "GET",
    })
    // setCurrentuserName(user.name)
    const responce = await data.json()
    dispatch(contactsAction(responce))
    // return responc
}

export default contactService


// export const fetchProductByCategory = () => async (dispatch) => {
//     const responce = await fetch(`${BaseURL}/products/categories`,{
//         method:"GET"
//     })
//     const category = await responce.json()
//     dispatch(productCategory(category))
// }
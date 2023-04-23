import {BaseURL} from "../../common/BaseURL/BaseURL"

const LoginUser = async (user) =>{
    const responce = await fetch(`${BaseURL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const userData = await responce.json()
    return userData
}

export default LoginUser
import { BaseURL } from "../../common/BaseURL/BaseURL"

const RegisterUser = async (user) => {
    const responce = await fetch(`${BaseURL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username: user.username, email: user.email, password: user.password }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const result = await responce.json()
    console.log(result , "result");
    return result
}

export default RegisterUser
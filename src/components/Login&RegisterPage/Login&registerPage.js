import { useContext, useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"
import chatConntext from "../../contextApi/contextApi"
import ForgotPasswordPage from "../ForgotPassword/ForgotPasswordPage"
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import "./Login&RegisterPage.css"

const LoginAndRegisterPage = () =>{
    const {setCurrentUserChatId} = useContext(chatConntext)
    const [switchs , setSwitch] = useState(true)
    const navigate = useNavigate()
    const [forgotPass , setForgotPassword] = useState(false)
    useEffect(() => {
      const Auth = localStorage.getItem("user")
      if (Auth) {
          navigate("/chat")
      }else{
        navigate("/")
        setCurrentUserChatId(previous =>({currentChatuserId:"",   }))
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [localStorage.getItem("user")])
    
    const handleSwitch = (type) =>{
        setSwitch(!switchs)
        setTimeout(()=>{
          setForgotPassword(false)
        }, 1000)
    }
    return(
      <div className="main">
      <div className={`container a-container ${switchs ? "is-txl" :""}`} id="a-container">
        {!forgotPass ?
      <RegisterPage />
      :<ForgotPasswordPage />
        }
      </div>
      <div className={`container b-container ${switchs? "is-txl is-z200" : ""}`} id="b-container">
        <LoginPage setForgotPassword={setForgotPassword} setSwitch={setSwitch} />
      </div>
      <div className={`switch ${switchs&& "is-txr"}`} id="switch-cnt">
        <div className={`switch__circle ${switchs&& "is-txr"}`}></div>
        <div className={`switch__circle switch__circle--t ${switchs&& "is-txr"}`}></div>
        <div className={`switch__container ${switchs&& "is-hidden"} `} id="switch-c1">
          <h2 className="switch__title title">Welcome Back !</h2>
          <p className="switch__description description">To keep connected with us please login with your personal info</p>
          <button className="switch__button button switch-btn" onClick={handleSwitch}>SIGN IN</button>
        </div>
        <div className={`switch__container ${!switchs&& "is-hidden"} `} id="switch-c2">
          <h2 className="switch__title title">Hello Friend !</h2>
          <p className="switch__description description">Enter your personal details and start journey with us</p>
          <button className="switch__button button switch-btn" onClick={handleSwitch} >SIGN UP</button>
        </div>
      </div>
    </div>
    )
}

export default LoginAndRegisterPage;
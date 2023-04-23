
import { useEffect, useState ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatConntext from "./contextApi";

const StateProvider = ({children}) =>{
    const navigate = useNavigate()
    const hiddenFileInput = useRef(null);
    const [user , setUser] = useState("")
    const [contact, setcontact] = useState([])
    const [message ,setMessage] = useState([])
    const [currentUserChatId , setCurrentUserChatId] = useState({conversatinId:"" , currentChatuserId:"",latestMessageSender : ""  })

    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            setUser(user)
        }else{
            // navigate("/login")
        }
    },[navigate])
    return(
        <chatConntext.Provider value={{
            user , setUser,
            contact, setcontact,
            message ,setMessage,
            currentUserChatId , setCurrentUserChatId ,
            hiddenFileInput
        }}>
            {children}
        </chatConntext.Provider>
    )
}

export default StateProvider;
import { useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import { BaseURL } from "../../common/BaseURL/BaseURL"
import chatConntext from "../../contextApi/contextApi"
import Chatcontainer from "../Chatcontainer/Chatcontainer"
import Contacts from "../Contacts/Contacts"
import UserProfile from "../UserProfile/UserProfile"
import WelcomePage from "../WelcomePage/WelcomePage"
import "./ChatStyle.css"
const ChatPage = () => {
    const { user} = useContext(chatConntext)
    const contact = useSelector(state => state.ContactDetails)
    const currentChatuser = useSelector(state => state.SelectUserForChat)
    const [toggle, setToggle] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [onlineUser , setOnlineUser] = useState([])
    const [searchUser, setsearchUser] = useState({ User: [], newUser: false })
    const socket = useRef(null)
    const navigate = useNavigate()
    // const host = BaseURL
    // console.log(currentChatuser , "currentChatuser");
    // console.log(Math.round(Math.random()) , "djbjhvbfhbfbvjhbnjvj");
    useEffect(() => {
        socket.current = io(BaseURL)
        return () => socket.current.close();
    }, [])
    useEffect(() =>{
        if(user.id){
        socket.current.emit("add-user", user.id)
        socket.current.on("get-user", (users) => {
            // console.log(users, "Is Online!"); // update online status
            setOnlineUser(users)
        });
        }
      

    }, [user ,socket])
    // console.log(socket , "sockettttttt");
    
    useEffect(() => {
        setToggle("")
        setSearchValue("")
        setsearchUser({ User: [], newUser: false })
        // socket.current.emit("add-user", user.id)

        socket.current.on("get-user", (users) => {
            // console.log(users, "Is Online!"); // update online status
            setOnlineUser(users)
        });

    }, [currentChatuser])
    
    const handleToggle = (type) => {
        if (type === toggle) {
            setToggle("")
            setSearchValue("")
            setsearchUser({ User: [], newUser: false }) 
        } else {
            setToggle(type)
        }
    }
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    const handleChange = (e) =>{
        if (e.target.value === "") {
            setSearchValue("")
            setsearchUser({User:[] , newUser:false})
        }else{

            setSearchValue(e.target.value)
        }
    }
    const handleSearchUser = async (e) => {
        // console.log(searchValue , "searchValuesearchValue" , e.key);
        if(e.key === "Enter"){
        if (searchValue.length > 0  && toggle === "") {
            // console.log(contact , "contact");
            const userFind = contact.userData.hasconversatinData.filter(user => user.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            setsearchUser({ User: userFind, newUser: false })
        } else

        if (searchValue.length > 3 && toggle === "add-contact" ) {
            const data = await fetch(`${BaseURL}/api/auth/search/user/?value=${searchValue}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const searchdata = await data.json()
            setsearchUser({ User: searchdata.users, newUser: true })

            // console.log(searchdata.users, "searchdata");
        } else {
            setsearchUser({ User: [], newUser: false })
        }
    }

    }
    const handleRemove = () =>{
        setSearchValue("")
        setsearchUser({ User: [], newUser: false })
    }
    // console.log(onlineUser , ":onlineUser");
    return (
        <div id="frame">
            <div id="sidepanel">
                <div className={`${toggle === "profile" ? "a-container is-hidden" : "a-container"}`}>
                    <div id="profile" >
                        <div className="wrap">
                            {user !== "" && <img id="profile-img" src={`${BaseURL}/${user.profilepic}`} className="online" alt="" />}
                            <p>{user.name}</p>
                            <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                                                        
                        </div>
                    </div>
                    <div id="search" >
                        <label><i className="fa fa-search" aria-hidden="true"></i></label>
                        <input type="text" placeholder={`${toggle === "add-contact" ? "Add contacts..." : "Search contacts..."}`} 
                        onChange={(e) => handleChange(e)} onKeyDown={handleSearchUser} value={searchValue} />
                        {searchValue && <i className="fa fa-times" id="cross" aria-hidden="true" onClick={handleRemove}></i>}
                    </div>
                    <div id="contacts" >
                        <Contacts searchUser={searchUser} setOnlineUser={setOnlineUser} toggle={toggle} searchValue={searchValue} socket={socket} onlineUser={onlineUser} />
                    </div>
                </div>
                <div className={` ${toggle === "profile" ? "b-container is-txl is-z200" : "b-container is"}`}>
                    {toggle === "profile" && <UserProfile setToggle={setToggle} />}
                </div>
                <div id="bottom-bar">
                    <button id="addcontact" className={toggle === "add-contact" ? "bg-color" : ""} onClick={() => handleToggle("add-contact")} ><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
                    <button id="settings" className={toggle === "setting" ? "bg-color" : ""} onClick={() => handleToggle("setting")}><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
                </div>
                {
                    toggle === "setting" && <div id="setting">
                        <div className="DropdownMore">
                            <ul>
                                <li onClick={handleLogout}><i className="fa fa-sign-out me-2"></i>Logout</li>
                                <li onClick={() => handleToggle("profile")} ><i className="fa fa-cog me-2"></i>profile</li>

                            </ul>
                        </div>
                    </div>
                }
            </div>
            {/* <div className="content"> */}
            { currentChatuser && currentChatuser.conversation.conversatinId ?
                // <h1>{currentChatuser.conversation.conversatinId}</h1>
                <Chatcontainer socketRef={socket} />
                : 
                <WelcomePage currentUser={user} />

            }
            {/* </div> */}
        </div>
    )
}

export default ChatPage
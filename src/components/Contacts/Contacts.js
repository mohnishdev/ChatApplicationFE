import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { conversationAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"
import chatConntext from "../../contextApi/contextApi"
import contactService from "../../Services/contactService/contactService"
import conversationStartService from "../../Services/conversationStartservice/conversationStartService"
// import ConversationUser from "../conversationuser/conversation"
// import "./contactStyle.css"

const Contacts = ({ searchUser, onlineUser }) => {

    const { user} = useContext(chatConntext)

    const contact = useSelector(state => state.ContactDetails)

    const [currentuserSelect, setcurrentuserSelect] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            dispatch(contactService(user.id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentuserSelect])

    const changeCurrentChat = async (item) => {
        if (item.conversationID) {
            setcurrentuserSelect(item.userId)
            const online = onlineUser.length > 0 && onlineUser.includes(item.userId)
            let current_Chat_user ;
            if (item.latestMessage) {
                current_Chat_user = { conversatinId: item.conversationID, currentChatuserId: item, latestMessageSender: contact.latestMessage.sender, online: online }
                // setCurrentUserChatId({ conversatinId: item.conversationID, currentChatuserId: item, latestMessageSender: contact.latestMessage.sender, online: online })
            } else {
                current_Chat_user = { conversatinId: item.conversationID, currentChatuserId: item, online: online }
                // setCurrentUserChatId({ conversatinId: item.conversationID, currentChatuserId: item, online: online })
            }
            dispatch(conversationAction(current_Chat_user))
        } else {
            const member = { from: user.id, to: item._id }
            if (window.confirm("Conversation start")) {
                dispatch(conversationStartService(member))
                setcurrentuserSelect(item._id)
            }
        }

    }

    return (
        searchUser.User.length > 0 ?
            <ul>
                {searchUser.User.map((item) => {
                    return (
                        <li className={"contact"}
                            onClick={() => changeCurrentChat(item)}
                        >
                            <div className="wrap">
                                {item !== "" && <img src={`${BaseURL}/${item.userProfilepic}`} alt="" />}
                                <div className="meta">
                                    <p className="name">{item.username}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            :
            <ul>
                {contact && contact.userData.hasconversatinData.map((items, ind) => {

                    return (
                        <li className={currentuserSelect === items.userId ? "contact active" : "contact"} onClick={() => changeCurrentChat(items)} key={ind} >
                            <div className="wrap">
                                <span className={`contact-status ${onlineUser.length > 0 && onlineUser.includes(items.userId) ? "online" : ""}`}></span>
                                {items !== "" && <img src={`${BaseURL}/${items.userProfilepic}`} alt="" />}
                                <div className="meta">
                                    <p className="name">{items.username}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
    )
}

export default Contacts

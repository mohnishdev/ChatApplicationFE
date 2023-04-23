import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessageAction } from "../../Actions"
import { BaseURL } from "../../common/BaseURL/BaseURL"
import ChatInput from "../../common/ChatInput/ChatInput"
// import { useNavigate } from "react-router-dom"
import chatConntext from "../../contextApi/contextApi"
import DeleteMessageService from "../../Services/DeleteMessageService/DeleteMessageService"
import GetMessageService from "../../Services/GetMessageService/GetMessageService"
import SendMessageService from "../../Services/SendMessageService/sendMessageService"
import "./ChatcontainerStyle.css"
// import { Modal} from "react-bootstrap"

const Chatcontainer = ({ socketRef }) => {
    const { user } = useContext(chatConntext)
    const currentChatuser = useSelector(state => state.SelectUserForChat)
    const AllMessage = useSelector(state => state.Message.AllMessage)
    // const [message, setMesaage] = useState([])
    // const [addmsg, setaddmsg] = useState("")
    const [currentUserChat, setCurrentUserChat] = useState("")
    const [deletemsg, setdeletedmsg] = useState("")
    const [arrivailMessage, setArrivailMessage] = useState("")
    const [editPopup, setEditpopup] = useState("")
    const [editMessage, setEditMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const ScrollBottom = useRef(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if (currentChatuser) {
            setCurrentUserChat(currentChatuser.conversation)
        }
    }, [currentChatuser])
    useEffect(() => {
        if (currentUserChat !== "") {
            const Ids = { from: user.id, to: currentUserChat.currentChatuserId.userId, conversationID: currentUserChat.conversatinId, latestMessageSender: currentUserChat.latestMessageSender }
            dispatch(GetMessageService(Ids))
            setdeletedmsg("")
            setEditpopup("")
            // getAllmessage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserChat])
    useEffect(() => {
        setTimeout(() => {
            ScrollBottom.current?.scrollIntoView({ behaviour: "smooth" })
        }, 100)
    }, [AllMessage])


    const handleSendmsg = async (msg, file) => {
        if (msg.status === true) {
            console.log(editMessage, "---editMessage---");
            const EditMessage = AllMessage.map(value => {
                let cloneValue = { ...value }
                if (cloneValue.id === editMessage.id) {
                    return cloneValue = { ...cloneValue, message: file }
                }
                return cloneValue
            })
            dispatch(getMessageAction(EditMessage))
            setEditMessage("")

        } else {
            let formData = new FormData()
            formData.append("from", user.id)
            formData.append("conversationID", currentUserChat.conversatinId)
            formData.append("to", currentUserChat.currentChatuserId.userId)
            if (msg === "file upload" && file.name) {
                formData.append('messageImage', file);
            } else {
                formData.append('message', msg);
            }
            dispatch(SendMessageService(formData)).then(
                (data) => {
                    const result = data.payload
                    // console.log(result, "result ,jdbhjdf");
                    const msgs = [...AllMessage]
                    if (msg === "file upload" && file.name) {
                        socketRef.current.emit("send-msg", {
                            to: currentUserChat.currentChatuserId.userId,
                            from: user.id,
                            messageImage: result.newmessageData.message.image,
                            id: result.newmessageData._id
                        })
                        msgs.push({ fromSelf: true, messageImage: result.newmessageData.message.image, id: result.newmessageData._id })
                    } else {
                        socketRef.current.emit("send-msg", {
                            to: currentUserChat.currentChatuserId.userId,
                            from: user.id,
                            message: msg,
                            id: result.newmessageData._id
                        })
                        msgs.push({ fromSelf: true, message: msg, id: result.newmessageData._id })
                    }
                    dispatch(getMessageAction(msgs))
                    // setMesaage(msgs)
                }
            )

        }
    }


    const handleUpdating = async (type, msg) => {
        // console.log(e.target.value);
        if (type === "Edit") {
            // alert("Edit Message")
            // console.log(user , "etitttttt");
            setEditMessage(msg)
            setEditpopup("")
        } else if (type === "Delete") {
            if (msg.fromSelf === true && window.confirm("Rellay Delete massege")) {
                // console.log("trueee");
                dispatch(DeleteMessageService(msg.id))

                socketRef.current.emit("delete-msg", {
                    deleteMessageID: msg.id,
                    to: currentUserChat.currentChatuserId.userId,
                    from: user.id,
                })
                const remainingMessage = AllMessage.filter((value) => value.id !== msg.id)
                dispatch(getMessageAction(remainingMessage))
                setEditpopup("")
            } else {
                // console.log("nooooooo");
                setEditpopup("")
            }
        }

    }

    useEffect(() => {
        // console.log(socketRef.current , "socketRef.currentsocketRef.current");
        if (socketRef.current) {
            socketRef.current.on("msg-recieve", (newMsg) => {
                console.log("newMsg ,", newMsg);
                if (newMsg.message) {
                    setArrivailMessage({ fromSelf: false, message: newMsg.message, id: newMsg.id })
                } else {
                    setArrivailMessage({ fromSelf: false, messageImage: newMsg.messageImage, id: newMsg.id })

                }
            })

        }

        socketRef.current.on("msg-delete", (id) => {
            setdeletedmsg(id)
            console.log(id.messageId, AllMessage ,"message id delete");
        })

        // return () => socketRef.current.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef])

    useEffect(() => {
        // console.log( arrivailMessage , "arrivailMessage");
        // arrivailMessage && setMesaage((prev) => [...prev, arrivailMessage])
        // console.log(arrivailMessage, "---arrivailMessage---", AllMessage, "---AllMessage---");
        if (arrivailMessage) {
            const NewMessage = [...AllMessage]
            NewMessage.push(arrivailMessage)
            dispatch(getMessageAction(NewMessage))
        }
        if (deletemsg) {
            const remainingMessage = AllMessage.filter((value) => value.id !== deletemsg.messageId)
            // console.log(remainingMessage , "remainingMessageremainingMessageremainingMessageremainingMessage");
            dispatch(getMessageAction(remainingMessage))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrivailMessage, deletemsg])



    const handleMassege = async (message) => {
        if (message.id !== editPopup) {
            // console.log("jdjhbfshbfsjbx");
            setEditpopup(message.id)
        } else {
            setEditpopup("")
        }

    }

    const handlePop = () => {
        if (editPopup !== "") {
            setEditpopup("")
        }
    }

    // const getMessageTime = (date) => {
    //     const currentdate = new Date()
    //     var newDate = new Date(date);
    //     // console.log(currentdate.getDate() ,currentdate.getMonth()+1 , newDate.getDate() , newDate.getMonth()+1  , "newdate");
    //     if ((currentdate.getDate() !== newDate.getDate())) {
    //         // console.log(newDate.getDate() , newDate.getMonth()+1 , newDate.getFullYear(), newDate.getHours() , newDate.getMinutes() , newDate.getSeconds());
    //         return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear() + "," + newDate.getHours() + ":" + newDate.getMinutes()
    //     } else {
    //         return newDate.getHours() + " : " + newDate.getMinutes()

    //     }

    //     // newDate.setMinutes(date.getMinutes());
    //     // return newDate;
    // }
    // console.log(currentUserChat, "onlineUser.length > 0 && onlineUser.includes(items.userId)");
    // console.log(editPopup ,"editPopup");
    const hangelShowImage = (image) => {
        setShowModal(!showModal)
    }

    return (
        <>{currentUserChat !== "" &&
            <div onClick={handlePop} className="content">
                <div className="contact-profile">
                    <div>
                        <img src={`${BaseURL}/${currentUserChat.currentChatuserId.userProfilepic}`} alt="" height={"40px"} />
                        <div className="profile">
                            <p className="UserName">{currentUserChat.currentChatuserId.username}</p>
                            <span className="status">{currentUserChat.online ? "Online" : "Offline"}</span>
                        </div>
                    </div>
                    <div className="social-media">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <i className="fa fa-video-camera" aria-hidden="true"></i>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>

                </div>
                <div className="messages">
                    <ul >
                        {AllMessage && AllMessage.map((msg, ind) => {
                            return (
                                <li className={msg.fromSelf ? "sent" : "replies"} ref={ScrollBottom} key={ind} >
                                    {!msg.fromSelf && <img src={`${BaseURL}/${currentUserChat.currentChatuserId.userProfilepic}`} alt="" height={"22px"} />}
                                    {msg.messageImage ?
                                        <img src={`${BaseURL}/${msg.messageImage}`}
                                            style={{ borderRadius: "10px", width: "190px", maxHeight: "220px" }}
                                            alt="uploadimage"
                                            onClick={() => hangelShowImage(`${BaseURL}/${msg.messageImage}`)}
                                        />
                                        :
                                        <p>{msg.message}</p>
                                    }
                                    {msg.fromSelf &&
                                        <>
                                            <span onClick={() => handleMassege(msg)} className="editMessageIcon">&#8942;</span>
                                            {editPopup === msg.id && <div className="editinfopopup">

                                                {!msg.messageImage && <><p className="m-0" onClick={() => handleUpdating("Edit", msg)} >Edit</p><br /></>}
                                                <p className="m-0" onClick={() => handleUpdating("Delete", msg)}>Delete</p>
                                            </div>}
                                        </>}
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
                <div className="message-input" >
                    <ChatInput handlemsg={handleSendmsg} editMessage={editMessage} />
                </div>
            </div>
        }
        </>
    )
}

export default Chatcontainer
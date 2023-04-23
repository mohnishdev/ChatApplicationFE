import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import EditMessageService from "../../Services/EditMessageService/EditMessageService"
import "./chatInput.css"
const ChatInput = ({ handlemsg, editMessage }) => {
    const [msg, setmsg] = useState("")
    const [file, setFile] = useState("")
    const [ImagePreview, setImagePreview] = useState("")
    const hiddenFileInput = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        if (editMessage !== "") {
            setmsg(editMessage.message)
        }
    }, [editMessage])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (msg.length === 0 && file) {
            // console.log(file , "fileeeeesss");
            handlemsg("file upload", file)
            setFile("")
        }
        if (msg.length > 0 && editMessage === "") {
            handlemsg(msg)
            setmsg("")
        } else if (msg.length > 0 && editMessage !== "") {
            console.log(typeof editMessage, editMessage, "editMessage", msg, typeof msg);
            if (editMessage.fromSelf === true) {
                const MESSAGE = {
                    ID:editMessage.id,
                    msg:msg
                }
                // console.log(MESSAGE , "message");
                dispatch(EditMessageService(MESSAGE)).then((data)=>{
                    console.log(data);
                     if (data.payload.status === true) {
                         handlemsg(data.payload, msg )
                         setmsg("")
                }
                })

                // if (result) {
                //     setmsg("")
                //     handlemsg(result)
                // }
            }
        }
    }
    const validateImage = (e) => {
        const ImageFile = e.target.files[0]
        setFile(ImageFile)
        setImagePreview(URL.createObjectURL(ImageFile))
    }
    // console.log(file , "filerkrnjkfvnj");
    return (
        <div className="wrap">
            {
                file && <img src={ImagePreview} width={"200px"} height="130px" style={{ borderRadius: "5px" }} alt="newimage" />
            }
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder={editMessage ? "Edit your message..."  :"Write your message..."} value={msg} onChange={(e) => setmsg(e.target.value)} />
                <i className="fa fa-paperclip attachment" aria-hidden="true" onClick={() => hiddenFileInput.current.click()}></i>
                <input type={"file"} ref={hiddenFileInput} className="fileInput" onChange={(e) => validateImage(e)} />
                <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
            </form>
        </div>
    )
}

export default ChatInput
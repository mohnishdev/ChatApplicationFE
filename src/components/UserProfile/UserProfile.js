import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import chatConntext from "../../contextApi/contextApi";
import userprofile from "../../Images/userprofile.jpg"
import UserProfileService from "../../Services/UserProfileService/UserProfileService";
import "./UserProfile.css"

const UserProfile = ({ setToggle }) => {
    const { setUser } = useContext(chatConntext)
    const [user, setuser] = useState("")
    const [editUser, setEditUser] = useState(false)
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const dispatch = useDispatch()

    const navigate = useNavigate()
    useEffect(() => {
        const User = JSON.parse(localStorage.getItem("user"))
        setuser(User)
    }, [editUser])
    const ProfileEdit = () => {
        setEditUser(!editUser)
    }

    const validateImage = (e) => {
        const ImageFile = e.target.files[0]
        setImage(ImageFile)
        setImagePreview(URL.createObjectURL(ImageFile))
    }
    const handleUpdateUser = async (e) => {
        e.preventDefault()
        // if(!image) return 
        const { username } = e.target
        console.log(e.target);
        console.log(username.value, user.id);
        if (username.value) {
            console.log(username.value, user.id, "condition true");
            // console.log(image , "file sdkjbvjhbvh");
            const formData = new FormData();
            formData.append('image', image || user.profilepic);
            formData.append('id', user.id);
            formData.append('username', username.value)
            dispatch(UserProfileService(formData , user.id)).then((data) =>{
                const result = data.payload
                localStorage.setItem("user", JSON.stringify(result.user))
            console.log(result.user, "result");
            // window.location.reload(true)
            setUser(result.user)
            setEditUser(false)
            navigate("/chat")
            })
            
        }

    }
    const handleBack = () => {
        setToggle("")
        setEditUser(false)
    }
    // console.log(imagePreview, "imagePreview");
    return (
        <div className="userProfile">
            <i className="fa fa-arrow-circle-left" aria-hidden="true" onClick={handleBack}></i>
            {user !== "" &&
                <div className="profileContainer">
                    <button className="profileBtn" onClick={ProfileEdit}>&#9998;</button>
                    {!editUser ?
                        <div className="w-100">
                            <p style={{ width: "90px", height: "90px" }}>
                                <img src={`http://localhost:8000/${user.profilepic}` || userprofile} alt="User profile" style={{ width: "100%", borderRadius: "50%", marginBottom: "15px", height: "100%" }} />
                            </p>
                            <h3 style={{ backgroundColor: "aliceblue", padding: "11px" }}>{user.name}</h3>
                            <h4 style={{ backgroundColor: "aliceblue", padding: "11px" }}>{user.email}</h4>
                        </div>
                        : <div className="w-100">
                            <form onSubmit={handleUpdateUser} >
                                <div className="profileimage">
                                    <img src={imagePreview || `http://localhost:8000/${user.profilepic}` || userprofile} alt="User profile" style={{ width: "90px", height: "90px", borderRadius: "50%", marginBottom: "15px" }} />
                                    <label htmlFor="image-upload" className="image-upload-lable">
                                        <small style={{ color: "white", fontSize: "20px", fontWeight: "900", backgroundColor: "green", padding: "0% 5px", borderRadius: "50%" }}>&#43;</small>
                                    </label>
                                    <input type={"file"} id="image-upload" hidden accept=".png , .jpeg , .jpg" name="image" onChange={validateImage} />
                                </div>
                                <div className="form-floating mb-3 ">
                                    <input type="text" name="username" defaultValue={user.name} className="form-control" id="floatingInput" placeholder="name@example.com" style={{ height: "55px" }} />
                                    <label>Enter username</label>
                                </div>
                                <div className="form-floating mb-3 ">
                                    <input type="email" name="email" disabled={true} defaultValue={user.email} className="form-control" id="floatingInput" placeholder="name@example.com" style={{ height: "55px" }} />
                                    <label>Enter Email</label>
                                </div>
                                {/* <div className="form-floating mb-3">
                                    <input type="password" name="password" defaultValue={user.password} className="form-control" placeholder="name@example.com" style={{ height: "55px" }} />
                                    <label>Enter Password</label>
                                </div> */}
                                {/* <small className="signuplink"><Link  to="/sign-up">Sign Up</Link></small> */}
                                <button type="submit" className="updateProfileBtn">Update</button>
                            </form>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default UserProfile; 
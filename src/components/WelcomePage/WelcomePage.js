import "./WelcomeStyle.css"
// import  image from "../../Images/logo124.jpg"
const WelcomePage = ({currentUser}) => {

    return(
        <div className="content">
        <div className="welcome">
            <h1>Welcome, <span>{currentUser.name}</span></h1>
            <h3>Please select a Chat to start Messaging</h3>
      </div> 
      </div> 
    )
}

export default WelcomePage
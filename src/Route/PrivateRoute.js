const { Outlet, Navigate } = require("react-router-dom")

const PrivateRoute = () =>{
    const auth = localStorage.getItem("user")
    return(auth ?<Outlet /> : <Navigate to="/" />)
}

export default PrivateRoute
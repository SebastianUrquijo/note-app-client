import { Navigate } from "react-router-dom"

export default function PrivateAdmin({children}){
    const user = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')) : {};
    return Object.keys(user).length > 0 ?  children : <Navigate to="/"/>
}
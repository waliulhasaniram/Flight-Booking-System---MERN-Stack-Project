import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../store/auth"


const Logout =()=>{
   const {loggout} = useAuth()

    useEffect(()=>{
        loggout()
    },[loggout])
   
    return <Navigate to="/login"/>
}

export default Logout
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../store/auth"
import { toast } from "react-toastify"

const Login =()=>{
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({email:"",password:""})
    const {storeAccessToken, mainURL} = useAuth()

    const inputHandeler =(e)=>{
        const name = e.target.name
        const value = e.target.value 
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${mainURL}/login`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(loginData)
            })
            const res_data = await response.json()
            if(response.ok){
                //console.log(res_data.data.accessToken)
                storeAccessToken(res_data.data.accessToken)
                setLoginData({email:"",password:""})
                toast.success('successfully loged in')
                navigate("/")
            }
           
        } catch (error) {
            console.log("login error ->",error)
        }
    }

    return <>
        <div className="reg_container">
        <div>
            <img className="regImage" src="/plain.jpg" alt="this is a registration image" width="500" height="500"/>
        </div>
        <div className="regForm">
            <form onSubmit={handelSubmit}>
                <h1>Login Form</h1>

                <div className="input_div">
                    <label>Email: </label><br/>
                    <input type="email" name="email" placeholder="email" id="email" value={loginData.email} onChange={inputHandeler} required />
                </div>
                <div className="input_div">
                    <label>Password: </label><br/>
                    <input type="password" name="password" placeholder="password" id="password" value={loginData.password} onChange={inputHandeler} required />
                </div>
                <div className="input_div">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>

        </div>   
    </>
}
export default Login;
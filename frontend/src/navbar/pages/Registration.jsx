import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { useAuth } from "../../store/auth"

const Registration =()=>{
    const navigate = useNavigate()
    const {mainURL} = useAuth()
    const [regData, setRegData] = useState({username:"", email:"", password:""})

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setRegData({
            ...regData,
            [name]: value
        })
    }

    const handelSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${mainURL}/register`, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(regData)
            });
    
            const res_data = await response.json();
            if (response.ok) {
                setRegData({ username: "", email: "", password: ""});
                toast.success("registration successful")
                navigate("/login");
            } else {
                toast.error(res_data.error.extraMessage)
            }
        } catch (error) {
            console.log("Registration error:", error);
        }
    };

    return <>
         <div className="reg_container">
            <div>
                <img className="regImage" src="/plain.jpg" alt="this is a registration image" width="500" height="500"/>
            </div>
            <div className="regForm">
            <form onSubmit={handelSubmit}>
                    <h1>Registration Form</h1>
                    <div className="input_div">
                        <label>Username: </label><br/>
                        <input type="text" name="username" placeholder="username" id="username" value={regData.username} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Email: </label><br/>
                        <input type="email" name="email" placeholder="email" id="email" value={regData.email} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Password: </label><br/>
                        <input type="password" name="password" placeholder="password" id="password" value={regData.password} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}
export default Registration;
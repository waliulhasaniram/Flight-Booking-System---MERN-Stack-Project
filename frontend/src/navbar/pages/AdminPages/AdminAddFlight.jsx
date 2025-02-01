import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../store/auth"
import {toast} from "react-toastify"

const AdminAddFlight =()=>{
    const {mainURL, authorizationToken} = useAuth()
    const navigate = useNavigate()
    const [regFlight, setregFlight] = useState({flightNumber:'', airline:'', origin:'', destination:'', date:'', time:'', price:'', availableSeats:''})

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setregFlight({
            ...regFlight,
            [name]: value
        })
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${mainURL}/addflight`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(regFlight)
            });
            
            const res_data = await response.json()
            if (response.ok) {
                setregFlight({ flightNumber: '', airline: '', origin: '', destination: '', date: '', time: '', price: '', availableSeats: '' });
                navigate('/displayflight');
                toast.success("flight added successfully")
                //window.location.reload()
            } else {
                toast.error(res_data.error.extraMessage)
            }
            console.log(regFlight)
            setregFlight({ flightNumber: '', airline: '', origin: '', destination: '', date: '', time: '', price: '', availableSeats: '' });
        } catch (error) {
            console.log("add new flight error:", error);
        }
    };
    return <>
        <div className="reg_container">
            <div className="regForm">
            <form onSubmit={handelSubmit}>
                    <h1>Add new flight Form</h1>
                    <div className="input_div">
                        <label>flightNumber: </label><br/>
                        <input type="text" name="flightNumber" placeholder="flightNumber" id="flightNumber" value={regFlight.flightNumber} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>airline: </label><br/>
                        <input type="text" name="airline" placeholder="airline" id="airline" value={regFlight.airline} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>origin: </label><br/>
                        <input type="text" name="origin" placeholder="origin" id="origin" value={regFlight.origin} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>destination: </label><br/>
                        <input type="text" name="destination" placeholder="destination" id="destination" value={regFlight.destination} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>date: exp 2025-01-30</label><br/>
                        <input type="text" name="date" placeholder="exp 2025-01-30" id="date" value={regFlight.date} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>time: exp 11:30 AM</label><br/>
                        <input type="text" name="time" placeholder="exp 11:30 AM" id="time" value={regFlight.time} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>price: </label><br/>
                        <input type="number" name="price" placeholder="price" id="price" value={regFlight.price} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>availableSeats: </label><br/>
                        <input type="number" name="availableSeats" placeholder="availableSeats" id="availableSeats" value={regFlight.availableSeats} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Add new flight</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}

export default AdminAddFlight
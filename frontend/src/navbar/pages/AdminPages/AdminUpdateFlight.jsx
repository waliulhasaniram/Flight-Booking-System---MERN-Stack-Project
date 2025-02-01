import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../store/auth"
import {toast} from "react-toastify"

const AdminUpdateFlight =()=>{
    const {mainURL, authorizationToken} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    
    const {_id, airline, availableSeats, date, destination, flightNumber, origin, price, time} = location.state

    const [updateFlight, setupdateFlight] = useState({flightNumber:'', airline:'', origin:'', destination:'', date:'', time:'', price:'', availableSeats:''})

    useEffect(()=>{
        setupdateFlight({
            flightNumber: flightNumber, airline: airline, origin:origin, destination:destination, date:date, time:time, price:price, availableSeats:availableSeats
        })
    },[])

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setupdateFlight({
            ...updateFlight,
            [name]: value
        })
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${mainURL}/updateFlight/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(updateFlight)
            })
            const res_data = await response.json()
            if(response.ok){
                setupdateFlight({ flightNumber: '', airline: '', origin: '', destination: '', date: '', time: '', price: '', availableSeats: '' });
                navigate(`/singleflight/${_id}`, { state: { ...updateFlight }})
               // window.location.reload();
                toast.success("successfully updated")
            }else {
                toast.error(res_data.error.extraMessage)
            }

        } catch (error) {
            console.log("add new flight error:", error);
        }
    };
    return <>
        <div className="reg_container">
            <div className="regForm">
            <form onSubmit={handelSubmit}>
            <h1>Update flight data</h1>
                    <div className="input_div">
                        <label>flightNumber: </label><br/>
                        <input type="text" name="flightNumber" placeholder="flightNumber" id="flightNumber" value={updateFlight.flightNumber} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>airline: </label><br/>
                        <input type="text" name="airline" placeholder="airline" id="airline" value={updateFlight.airline} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>origin: </label><br/>
                        <input type="text" name="origin" placeholder="origin" id="origin" value={updateFlight.origin} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>destination: </label><br/>
                        <input type="text" name="destination" placeholder="destination" id="destination" value={updateFlight.destination} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>date: exp 2025-01-30</label><br/>
                        <input type="text" name="date" placeholder="exp 2025-01-30" id="date" value={updateFlight.date} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>time: exp 11:30 AM</label><br/>
                        <input type="text" name="time" placeholder="exp 11:30 AM" id="time" value={updateFlight.time} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>price: </label><br/>
                        <input type="number" name="price" placeholder="price" id="price" value={updateFlight.price} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>availableSeats: </label><br/>
                        <input type="number" name="availableSeats" placeholder="availableSeats" id="availableSeats" value={updateFlight.availableSeats} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">update flight</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}

export default AdminUpdateFlight
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import {toast} from "react-toastify"

const BookFlight =()=>{
    const naviagte = useNavigate()
    const {mainURL, authorizationToken} = useAuth()
    const location = useLocation()
    const {_id, airline, destination, date, time, price} = location.state
    const [bookingData, setBookingData] = useState({number_of_seats:'', total_price:''})

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBookingData({
            ...bookingData,
            [name]: value,
            total_price: name === 'number_of_seats' ? value * price : bookingData.total_price
        });
    };

    const handelSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${mainURL}/bookings/${_id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : authorizationToken
                },
                body: JSON.stringify(bookingData)
            })
            if(response.ok){
                setBookingData({number_of_seats:'', total_price:''})
                toast.success('your flight is booked now')
                naviagte('/profile')
            }

        } catch (error) {
            console.log("booking error", error)
        }
    }
    
    return <>
    <div className="bookFlight">
        <div className="description">
        <h1>Bookinfg Flight for </h1>
            <h1>{airline}</h1>
            <h2>Price: ${price}</h2>
            <h3>Origin: {origin}</h3>
            <h4><u>Flight destination:</u><br/> {destination}</h4>
            <h3>Time: {time}</h3>
            <h3>Date: {date}</h3>
        </div>

        <div className="reg_container">
            <form onSubmit={handelSubmit}>
                <h2>Fill the number of seats and book</h2>
                <div className="input_div">
                    <label>Number of Seats: </label><br/>
                    <input type="number" name="number_of_seats" placeholder="number of seats" id="number_of_seats" value={bookingData.number_of_seats} onChange={handelChange} required />
                </div>
                <div className="input_div">
                    <label>Total price: </label><br/>
                    <input type="number" name="price" placeholder="price" id="price" value={bookingData.total_price} onChange={handelChange} required />
                </div>
                <div className="input_div">
                    <button type="submit">Book now</button>
                </div>
            </form>
        </div>
        
    </div>
    </>
}
export default BookFlight;

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../store/auth"

const AdminUpdateBooking =()=>{
    const navigate = useNavigate()
    const {mainURL, authorizationToken} = useAuth()
    const location = useLocation()
    const {_id, number_of_seats, total_price} = location.state

    const [bookingDataUpdate, setbookingDataUpdate] = useState({number_of_seats:'', total_price:''})

    useEffect(()=>{
        setbookingDataUpdate({
            number_of_seats: number_of_seats, total_price : total_price
        })
    },[])
    
        const handelChange =(e)=> {
            const name = e.target.name;
            const value = e.target.value;
            setbookingDataUpdate({
                ...bookingDataUpdate,
                [name]: value,
                //total_price: name === 'number_of_seats' ? value * total_price : bookingDataUpdate.total_price
            });
        };
    
        const handelSubmit =async(e)=>{
            e.preventDefault()
            try {
                const response = await fetch(`${mainURL}/update-booking-data/${_id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization : authorizationToken
                    },
                    body: JSON.stringify(bookingDataUpdate)
                })
                if(response.ok){
                    setbookingDataUpdate({number_of_seats:'', total_price:''})
                    navigate('/admin/admin-see-booking')
                }
    
            } catch (error) {
                console.log("booking error", error)
            }
        }

    return <>
     <h1>admin update flight booking</h1>
     <h3 style={{textAlign:"center"}}>update the seat number. price will be updated automatically</h3>
     
     <div className="bookFlight">
        <div className="regForm">
                <form onSubmit={handelSubmit}>
                    <h2>Fill the number of seats and book</h2>
                    <div className="input_div">
                        <label>Number of Seats: </label><br/>
                        <input type="number" name="number_of_seats" placeholder="number of seats" id="number_of_seats" value={bookingDataUpdate.number_of_seats} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>Total price: </label><br/>
                        <input type="number" name="total_price" placeholder="total_price" id="total_price" value={bookingDataUpdate.total_price} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Book now</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default AdminUpdateBooking
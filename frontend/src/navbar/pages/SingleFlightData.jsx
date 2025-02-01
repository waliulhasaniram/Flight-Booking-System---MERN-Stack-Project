import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../store/auth"

const SingleFlightData =()=>{
    const navigate = useNavigate()
    const {loggedInUser, mainURL, authorizationToken} = useAuth()
    const location = useLocation()
    const {_id, airline, availableSeats, date, destination, flightNumber, origin, price, time} = location.state;

    const onDelete =async()=>{
        try {
            const response = await fetch(`${mainURL}/delete/${_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                navigate('/displayflight')
                window.location.reload()
            }
        } catch (error) {
            console.log('flight delete error', error)
        }
    }

    return <>
        <div className="container_section">
            <div className="image_Section">
                <img className="image_single" src="/plain.jpg" alt="image"/>                
            </div>
            <div className="description">
                <h1>{airline}</h1>
                <h2>Price: ${price}</h2>
                <h3>Origin: {origin}</h3>
                <h4><u>Flight destination:</u><br/> {destination}</h4>
                <h3>Available Seats: {availableSeats} {availableSeats > 0 ? "available" : "not available"}</h3>
                <h3>Time: {time}</h3>
                <h3>Date: {date}</h3>
                <hr />
                <NavLink to={`/bookflight/${_id}`} state={{_id, airline, destination, date, time, price}}><button className="orderButton">Book now</button></NavLink><br/><br/>

                {loggedInUser && loggedInUser.isAdmin ? ( //if admin then show
                <>
                    <NavLink to={`/admin/admin-update-flight/${_id}`} state={{...location.state}}><button>Update</button></NavLink>
                    <button onClick={()=> onDelete()}>delete</button>
                </>
                ) : (<></>)} 
            </div>
        </div>
    </>
}

export default SingleFlightData
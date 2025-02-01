
import { useEffect, useState } from "react"
import {useAuth} from "../../../store/auth"
import { NavLink } from "react-router-dom"

const AdminSeeBooking =()=>{
    const {mainURL, authorizationToken} = useAuth()
    const [seeAllBooking, setSeeAllBooking] = useState()
    const [seFlightData, setSeeFlightData] = useState()
    const [seeUserData, setSeeUserData] = useState()

    const allFlightBookedData =async()=>{
        try {
            const response = await fetch(`${mainURL}/bookedFlight`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                const res_data = await response.json()
                //console.log(res_data.data)
                setSeeAllBooking(res_data.data.allBooking)
                setSeeFlightData(res_data.data.flightData)
                setSeeUserData(res_data.data.userData)
            }
        } catch (error) {
            console.log("all Flight Booked Data error", error)
        }
    }
    useEffect(()=>{
        allFlightBookedData()
    },[])

    ///delete booking
    const deleteBooking =async(id)=>{
        try {
           const response = await fetch(`${mainURL}/delete-booking/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
           })
           if(response.ok){
            window.location.reload()
           } 
        } catch (error) {
            console.log("booking delete error",error)
        }
    }

    return <>
    <h1>admin see flight booking</h1>
    <div className="bookHistory">

                {Array.isArray(seeAllBooking) && seeAllBooking.map((curElem1, index)=>{
                    const {number_of_seats, total_price, userId, flightId} = curElem1
                    return <div className="description_history" key={index}>
                        <h3>Number of Seats: {number_of_seats}</h3>
                        <h3>total price: {total_price}</h3>

                        <hr/>

                        {Array.isArray(seeUserData) && seeUserData.map((curElem2, index)=>{
                            const {_id, username, email} = curElem2
                            if(_id === userId){
                                return <div key={index}>
                                            <h3>Username: {username}</h3>
                                            <h3>Email: {email}</h3>
                                        </div> 
                            }
                        })}

                        <hr/>

                        {Array.isArray(seFlightData) && seFlightData.map((curElem3, index)=>{
                            const {_id, airline, origin, destination, date, time, price} = curElem3
                            if(_id === flightId){
                                return <div  key={index}>
                                        <h2>{airline}</h2>
                                        <h3>Price: ${price}</h3>
                                        <h3>Origin: {origin}</h3>
                                        <h4><u>Flight destination:</u><br/> {destination}</h4>
                                        <h3>Time: {time}</h3>
                                        <h3>Date: {date}</h3>
                                    </div>
                            }
                        })}
    
                        <NavLink to={`/admin/admin-update-booking/${curElem1._id}`} state={{...curElem1}}><button>Update booking</button></NavLink>
                        <button onClick={()=> deleteBooking(curElem1._id)}>Delete booking</button>
                    </div>
                })}          

        </div>
    </>
}
export default AdminSeeBooking
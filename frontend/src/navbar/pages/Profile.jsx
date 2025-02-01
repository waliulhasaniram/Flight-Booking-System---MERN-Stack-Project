import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import {toast} from 'react-toastify'

const Profile =()=>{
    const {loggedInUser, mainURL, authorizationToken, setLoading} = useAuth()
    const [flightHistory, setFlightHistory] = useState()
    const [flightBookingHistory, setFlightBookingHistory] = useState()


    const [updateUserData, setUpdateUserData] = useState({username:"", email:""})

    useEffect(() => {
        if (loggedInUser) {
            setUpdateUserData({ username: loggedInUser.username, email: loggedInUser.email });
        }
    }, [loggedInUser]);

    const inputHandeler =(e)=>{
        const name = e.target.name
        const value = e.target.value 
        setUpdateUserData({
            ...updateUserData,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${mainURL}/update-user`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : authorizationToken
                },
                body: JSON.stringify(updateUserData)
            })
           if(response.ok){
               //window.location.reload()
               toast.success("user date updated! now reload the page")
           }
        } catch (error) {
            console.log("login error ->",error)
        }
    }

    const getUsersFlightHistory =async()=> { // flight booking history
        try {
            const response = await fetch(`${mainURL}/bookings/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                const res_data = await response.json()
                //console.log(res_data.data)
                setFlightHistory(res_data.data.findFlightFromId)
                setFlightBookingHistory(res_data.data.findUsersBookedFlight)
            }

        } catch (error) {
            console.log("booking history error", error)
        }
    }
    useEffect(()=>{
        getUsersFlightHistory()
    },[])

    return <>
        <div className="profileDiv">
            <h1>User Profile</h1>
            <table border={3} className='profileTable'>
                <thead>
                    <th>username</th>
                    <th>email</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{loggedInUser && loggedInUser.username}</td>
                        <td>{loggedInUser && loggedInUser.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    {/*update user info  */}
        <div className="profileDiv">
            <form onSubmit={handelSubmit}>
                <h2 style={{textAlign:"center"}}>you can update your data here</h2>

                <div className="input_div">
                    <label>Email: </label><br/>
                    <input type="username" name="username" placeholder="username" id="username" value={updateUserData.username} onChange={inputHandeler} required />
                </div>
                <div className="input_div">
                    <label>Password: </label><br/>
                    <input type="email" name="email" placeholder="email" id="email" value={updateUserData.email} onChange={inputHandeler} required />
                </div>
                <div className="input_div">
                    <button type="submit">update</button>
                </div>
            </form>
        </div>

        <h2 style={{textAlign:"center"}}>flight booking history</h2>
        <div className="bookHistory">
            {Array.isArray(flightHistory) && flightHistory.map((curElem, index)=>{
                const {_id, airline, origin, destination, date, time, price} = curElem
                return <div className="description_history" key={index}>
                    <h1>{airline}</h1>
                <h2>Price: ${price}</h2>
                <h3>Origin: {origin}</h3>
                <h4><u>Flight destination:</u><br/> {destination}</h4>
                <h3>Time: {time}</h3>
                <h3>Date: {date}</h3>

                {Array.isArray(flightBookingHistory) && flightBookingHistory.map((curElem, index)=>{
                    const {number_of_seats, total_price} = curElem
                    return <div key={index}>
                        <h3>Number of Seats: {number_of_seats}</h3>
                        <h3>total price: {total_price}</h3>
                    </div>
                })}

                </div>
            })}

        </div>
        
    </>
}

export default Profile ;
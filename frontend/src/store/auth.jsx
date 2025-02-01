import { createContext, useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie"

const FlightContext = createContext()

export const FlightProvider =({children})=>{

    const mainURL = import.meta.env.VITE_MAIN_SERVER_URL //'http://localhost:3000/api'
    
    const [loading, setLoading] = useState(true)
    const [allFlights, setAllFlights] = useState()
    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"))

    const [loggedInUser, setLoggedInUser] = useState()
    const authorizationToken = `Bearer ${accessToken}`
    const isLoggedIn = !!accessToken

    const [limit, setLimit] = useState(3)
    const [pageCount, setPageCount] = useState(1)
    const currentPage = useRef()

    const storeAccessToken =(storeToken)=> {
        setAccessToken(storeToken)
        return Cookies.set("accessToken", storeToken)
    }

    const getUserData =async()=> {
        setLoading(true)
        const response = await fetch(`${mainURL}/user`, {
            method: "GET", 
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            const res_user = await response.json()
            setLoggedInUser(res_user.data)
            setLoading(false)
        }
    }

    const loggout =async()=>{
        const response = await fetch(`${mainURL}/logout`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            setAccessToken("")
            Cookies.remove("accessToken")
        }
    }

    const getAllFlightdata =async()=>{
        try {
            setLoading(true)
            const response = await fetch(`${mainURL}/flights?page=${currentPage.current || 1}&limit=${limit || 3}`, {
                method: 'GET' 
            })
            if(response.ok){
                const res_flights = await response.json()
                //console.log(res_flights.data)
                setAllFlights(res_flights.data.results)
                setPageCount(res_flights.data.pageCount)
                setLoading(false) 
            }
        } catch (error) {
            console.log("all flights data", error)
        }
    }
    
    //filter product
    const getFilterFlight =async(airline, origin, destination,  sort, page, limit)=>{
        setLoading(true)
        const url = `${mainURL}/flight/apply-filter?page=${currentPage || 1}&limit=${limit || 3}${airline ? `&airline=${airline}` : ''}${origin ? `&origin=${origin}` : ''}${destination ? `&destination=${destination}` : ''}${sort ? `&sort=${sort}` : ''}`
        const response = await fetch(url, {
            method: "GET"
        })
        if(response.ok){
            const res_flight = await response.json()
            if(res_flight.data && res_flight.data.length !== 0){
                console.log(res_flight.data)
                setAllFlights(res_flight.data)
                setLoading(false)
            }else{
                getAllFlightdata()
                setLoading(false)
            }
        }
    }
    useEffect(()=>{
        currentPage.current = 1
        getAllFlightdata()
        getFilterFlight()
    },[limit]);

    useEffect(()=>{
        getUserData()
    },[])

    return <FlightContext.Provider value={{mainURL, allFlights, authorizationToken, isLoggedIn, loggedInUser, 
        currentPage, pageCount,  limit, setLoading, getFilterFlight, getAllFlightdata, loggout, storeAccessToken}}>{children}</FlightContext.Provider>
}

export const useAuth =()=> {
    const contextValue = useContext(FlightContext)
    return contextValue
}

import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

const DisplayFlight =()=>{
    const {allFlights, mainURL, pageCount, currentPage, getAllFlightdata, getFilterFlight} = useAuth()
    //console.log(allFlights)
    const [fliterAirline, setFliterAirline] = useState()
    const [filterOrigine, setFliterOrigine] = useState()
    const [filterDestination, setFilterDestination] = useState()

    const [selectAirline, setSelectAirline] = useState('')
    const [selectOrigin, setSelectOrigin] = useState('')
    const [selectDestination, setSelectDestination] = useState('')

    const [sortOrder, setSortOrder] = useState('');

    const handlePageClick=(e)=>{
        console.log(e)
        currentPage.current = e.selected+1
        getAllFlightdata()
    }
 
    const getAirlineForFilter =async()=>{
        try {
            const response = await fetch(`${mainURL}/flight/airline`, {
                method: "GET"
            })
            if(response.ok){
                const res_data = await response.json()
                //console.log(res_data.data)
                const airlineData = res_data.data
                
                const uniqueAirlineSet = new Set(airlineData.map(item=> item.airline))     //unique catagory value (as set)
                const uniqueAirlineArray = ["All", ...uniqueAirlineSet]                   //unique catagory value (as set)
                const uniqueAirlineObject = uniqueAirlineArray.map(item=> ({item}))      //converting the array to an object again
                setFliterAirline(uniqueAirlineObject)

                const uniqueOriginSet = new Set(airlineData.map(item=> item.origin))     //unique catagory value (as set)
                const uniqueOriginArray = ["All", ...uniqueOriginSet]                   //unique catagory value (as set)
                const uniqueOriginObject = uniqueOriginArray.map(item=> ({item}))      //converting the array to an object again
                setFliterOrigine(uniqueOriginObject)

                const uniqueDesSet = new Set(airlineData.map(item=> item.destination))     //unique catagory value (as set)
                const uniqueDesArray = ["All", ...uniqueDesSet]                           //unique catagory value (as set)
                const uniqueDesObject = uniqueDesArray.map(item=> ({item}))              //converting the array to an object again
                setFilterDestination(uniqueDesObject)
            }
        } catch (error) {
            console.log("airline filter error", error)
        }
    }
    useEffect(()=>{
        getAirlineForFilter()
    },[])

    const handelAirlineClick =async(airline)=>{
        if(airline === "All") {
            setSelectAirline('')
            getFilterFlight();
        }else {
            setSelectAirline(airline)
            getFilterFlight(airline, selectOrigin, selectDestination, sortOrder)
        }
    }

    const handelOriginClick =async(origin)=>{
        if(origin === "All") {
            setSelectOrigin('')  
            getFilterFlight()
        }else{
            setSelectOrigin(origin)
            getFilterFlight(selectAirline, origin, selectDestination, sortOrder)
        }
    }

    const handelDestinationClick =async(destination)=>{
        if(destination === "All") {
            setSelectDestination('')  
            getFilterFlight()
        }else{
            setSelectDestination(destination)
            getFilterFlight(selectAirline, selectOrigin, destination, sortOrder)
        }
    }

    const handleSortChange = async(order) => { 
        setSortOrder(order);
        const sortByPrice = order
        getFilterFlight(selectAirline, selectOrigin, selectDestination, sortByPrice); 
    }

    const handleClearFilter =async()=>{
        setSelectAirline('')
        setSelectOrigin('') 
        setSelectDestination('')
        setSortOrder('');
        getFilterFlight();
    }

    // filter section toggle
    const [showFilters, setShowFilters] = useState(false);

    return <>
    
    <div className="pagination">
            <ReactPaginate
            className="pagination"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            />
        </div>
        <h2>Search your flight useing filter</h2>
        <div className="product_page">
            <button className="filter-toggle" onClick={() => setShowFilters(prev => !prev)}>
            &#x1F50D; Filter
            </button>

            <div className={`filter_section ${showFilters ? 'show' : 'hide'}`}>

                <h3>Airlines</h3>
                    {Array.isArray(fliterAirline) && fliterAirline.map((curElem, index)=>{
                        //console.log(curElem.item)
                        return <div key={index}>
                            <button className={curElem === selectAirline ? 'activeFilter' : 'filterButton'}
                            onClick={()=> handelAirlineClick(curElem.item)}> {curElem.item} </button>
                        </div>
                    })}
                <h3>Origin</h3>
                    {Array.isArray(filterOrigine) && filterOrigine.map((curElem, index)=>{
                        return <div key={index}>
                            <button className={curElem === selectOrigin ? 'activeFilter' : 'filterButton'}
                            onClick={()=>handelOriginClick(curElem.item)}> {curElem.item} </button>
                        </div>
                    })}
                <h3>Destination</h3>
                    {Array.isArray(filterDestination) && filterDestination.map((curElem, index)=>{
                        return <div key={index}>
                            <button className={curElem === selectDestination ? 'activeFilter' : 'filterButton'}
                            onClick={()=>handelDestinationClick(curElem.item)}> {curElem.item} </button>
                        </div>
                    })}

                <h3>Sort</h3>
                <button onClick={()=> {handleSortChange('asc')}}>low to high</button>
                <button onClick={()=> handleSortChange('desc')}>high to low</button>

                <button style={{backgroundColor:'red'}} onClick={()=>handleClearFilter()}>Clear filter</button>           
            </div>

            <div className="flight_section">
                {Array.isArray(allFlights) && allFlights.map((curELem, index)=>{
                    const {_id, airline, availableSeats, date, destination, flightNumber, origin, price, time} = curELem
                    return <div key={index}>
                        <NavLink to={`/singleflight/${_id}`} state={{...curELem}}>
                            <div className="card">
                                <img className="image" src="/plain.jpg" alt="image"/>
                                <div className="name_price">
                                    <div><h4>Airline:{airline}</h4><h4>origin: {origin}</h4></div>
                                    <div><h4>Destination: {destination}</h4></div>
                                    <div><h4>Date: {date}</h4></div>
                                </div> 
                            </div>
                        </NavLink>
                    </div>
                })}
            </div>

        </div>

        <div className="pagination">
            <ReactPaginate
            className="pagination"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            />
        </div>
    </>
}
export default DisplayFlight;

import { NavLink } from "react-router-dom"
import './Navbar.css'
import { useState } from "react"
import { GiPlanetConquest } from "react-icons/gi";
import { useAuth } from "../store/auth";

const Navbar =()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {isLoggedIn, loggedInUser} = useAuth()    
        
    const toggolMepu =()=>{
        setIsMenuOpen(!isMenuOpen)
    }

    return <>
        <nav className="container">
        <NavLink to="/">
                <div className="title">
                    <GiPlanetConquest className="navLogo"/>
                    <h2></h2>
                </div>
        </NavLink>
            <div>
                <div className="menu" onClick={toggolMepu}>
                    <div className="menu_icon"></div>
                    <div className="menu_icon"></div>
                    <div className="menu_icon"></div>
                </div>
                
                <div>
                    <ul className={isMenuOpen ? "navList active" : "navList"}>
                        <li><NavLink to="/" onClick={toggolMepu}>Home</NavLink></li>
                        <li><NavLink to="/displayflight" onClick={toggolMepu}>Flights</NavLink></li>
                        
                        {isLoggedIn ? 
                            loggedInUser && loggedInUser.isAdmin ? (
                                    <>
                                        <li><NavLink to="/profile" onClick={toggolMepu}>Profile</NavLink></li>
                                        <li><NavLink to="/admin" onClick={toggolMepu}>Admin</NavLink></li>
                                        <li><NavLink to="/logout" onClick={{toggolMepu}}>Logout</NavLink></li>
                                    </>
                            ) : (
                                    <>
                                        <li><NavLink to="/profile" onClick={toggolMepu}>Profile</NavLink></li>
                                        <li><NavLink to="/logout" onClick={{toggolMepu}}>Logout</NavLink></li>
                                    </>
                            ) 
                            : (<>
                            <li><NavLink to="/register" onClick={toggolMepu}>Register</NavLink></li>
                            <li><NavLink to="/login" onClick={toggolMepu}>Login</NavLink></li>
                        </>)}

                    </ul>
                </div>
            </div>
        </nav>
    </>
}
export default Navbar
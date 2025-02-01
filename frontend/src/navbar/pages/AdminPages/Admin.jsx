import { NavLink, Outlet } from "react-router-dom"

const Admin =()=>{
    return <>
        <h1>This is Admin navigation page</h1>
        <header>
            <div className="admin_navbar">
                <h4>click the buttons here to see data</h4>
                <nav className="adminNav">
                    <ul>
                        <li><button> <NavLink to="/admin/admin-add-flight">add flight</NavLink></button></li><br/>
                        <li><button><NavLink to="/displayflight">update flight</NavLink></button></li><br/>
                        <li><button> <NavLink to="/admin/admin-see-booking">see booking</NavLink></button></li><br/>
                    </ul>
                </nav>
                <hr style={{width:'100%'}}/>
            </div>
        </header>
        <Outlet/>
    </>
}

export default Admin
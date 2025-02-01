import { NavLink } from "react-router-dom"

const Error =()=>{
    return<>
        <h1>404 not fount</h1>
        <NavLink to='/'><button>go back to home</button></NavLink>
    </>
}
export default Error
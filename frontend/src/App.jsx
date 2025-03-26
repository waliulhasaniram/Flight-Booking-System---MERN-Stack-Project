import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './navbar/pages/Home'
import DisplayFlight from './navbar/pages/DisplayFlights'
import BookFlight from './navbar/pages/BookFlight'
import Login from './navbar/pages/Login'
import Registration from './navbar/pages/Registration'
import Profile from './navbar/pages/Profile'
import Navbar from './navbar/Navbar'
import SingleFlightData from './navbar/pages/SingleFlightData'
import Admin from './navbar/pages/AdminPages/Admin'
import Logout from './navbar/pages/Logout'
import AdminAddFlight from './navbar/pages/AdminPages/AdminAddFlight'
import AdminUpdateFlight from './navbar/pages/AdminPages/AdminUpdateFlight'
import AdminSeeBooking from './navbar/pages/AdminPages/AdminSeeBooking'
import AdminUpdateBooking from './navbar/pages/AdminPages/AdminUpdateBooking'
import Error from './navbar/pages/Error'
import Footer from './navbar/pages/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='*' element={<Error />}/>
            <Route path='/displayflight' element={<DisplayFlight />}/>
            <Route path='/singleflight/:id' element={<SingleFlightData />}/>
            <Route path='/bookflight/:id' element={<BookFlight />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Registration />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/logout' element={<Logout />}/>
            <Route path='/admin' element={<Admin />}>
              <Route path='admin-add-flight' element={<AdminAddFlight />}/>
              <Route path='admin-update-flight/:id' element={<AdminUpdateFlight />}/>
              <Route path='admin-see-booking' element={<AdminSeeBooking />}/>
              <Route path='admin-update-booking/:id' element={<AdminUpdateBooking />}/>
            </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

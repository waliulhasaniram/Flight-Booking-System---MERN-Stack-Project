import { NavLink } from "react-router-dom";

const Home =()=>{
    return <>
        <div className="App">
      <header className="App-header">
        <h1><b>Flight Booking System</b></h1>

      <NavLink to='/displayflight'><button>Search your flight </button></NavLink>
      </header>
      
      <main>
        <section className="featured-destinations">
          <h2>Featured Destinations</h2>
          <div className="destinations">
            <div className="destination">
              <h3>New York</h3>
              <p>Explore the city that never sleeps.</p>
            </div>
            <div className="destination">
              <h3>Paris</h3>
              <p>Visit the city of lights and love.</p>
            </div>
            <div className="destination">
              <h3>Tokyo</h3>
              <p>Experience the vibrant culture of Japan.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
}
export default Home;
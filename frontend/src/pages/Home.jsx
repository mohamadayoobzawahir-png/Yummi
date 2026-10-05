import { Link } from 'react-router'
import logo from '../assets/logo.jpg'

function Home() {
    return (
        <section className="hero">
            <img src={logo} alt="Yummiii logo" width="200" className="hero-logo" />
            <h1>Welcome to Yummiii!</h1>
            <p>Cakes, fast food and sweets, delivered to your door.</p>
            <div className="dots">
                <span></span><span></span><span></span>
            </div>
            <Link to="/shop" className="btn btn-cta">
                Shop Now
            </Link>
        </section>
    )
}

export default Home
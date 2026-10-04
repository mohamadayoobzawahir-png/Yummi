import logo from './assets/logo.jpg'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar cartCount={12}/>
      <main className="home">
        <img src={logo} alt="Yummiii logo" width="200" className="home-logo" />
        <h1>Welcome to Yummiii!</h1>
        <p>Cakes, fast food and sweets, delivered to your door.</p>
        <button className="btn">Shop Now</button>
      </main>
    </div>
  )
}

export default App

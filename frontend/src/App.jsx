import logo from './assets/logo.jpg'

function App() {
  return (
    <main className="home">
      <img src={logo} alt="Yummiii logo" width="200" className="home-logo" />
      <h1>Welcome to Yummiii!</h1>
      <p>Cakes, fast food and sweets, delivered to your door.</p>
      <button className="btn">Shop Now</button>
    </main>
  )
}

export default App

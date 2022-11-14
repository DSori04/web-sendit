import { Link, Route, Routes } from 'react-router-dom'
import { AboutUs } from './AboutUs/AboutUs'
import { Contact } from './Contact/Contact'
import { LogIn } from './LogIn/LogIn'
import { NewOrder } from './NewOrder/NewOrder'
import { Prices } from './Prices/Prices'
import { Tracking } from './Tracking/Tracking'

function App() {
  return (
    <div className="App w-full h-full bg-red1">
    <h1>Main</h1>
      <ul>
        <li><Link href="/about-us">About Us</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/login">LogIn</Link></li>
        <li><Link href="/new">NewOrder</Link></li>
        <li><Link href="/prices">Prices</Link></li>
        <li><Link href="/tracking">Tracking</Link></li>
      </ul>
      <Routes>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/new" element={<NewOrder />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </div>
  )
}

export default App

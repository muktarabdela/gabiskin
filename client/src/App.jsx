import { Route, Routes } from 'react-router-dom'
import Header from './componet/header/Header'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Works from './pages/Works'
import "./app.css"
import Cart from './pages/Cart'
import Footer from './componet/footer/Footer'
import Account from './componet/Account/account'
import CheckoutPage from "./componet/checkOut/CheckOut"
import Admin from './pages/Admin'

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/works" element={<Works />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/account/:userId" element={<Account />} />

        <Route path="/admin" element={<Admin />} />

        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>

      {/* <Footer /> */}

    </>
  )
}
export default App
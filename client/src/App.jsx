import { Navigate, Route, Routes } from 'react-router-dom'
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
import Page404 from './pages/Page404'
import AdminAuth from './componet/Account/AdminAuth'
import { useSelector } from 'react-redux';


const PrivateRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" />;
};
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Footer />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Pricing />
            <Footer />

          </>
        } />
        <Route path="/works" element={
          <>
            <Works />
            <Footer />

          </>

        } />
        <Route path='/cart' element={
          <>
            <Cart />
            <Footer />
          </>
        } />
        <Route path="/account/:userId" element={
          <>
            <Account />
            <Footer />
          </>
        } />
        <Route path="/login" element={<AdminAuth />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={<Admin />} />}
        />
        <Route path='/checkout' element={
          <>
            <CheckoutPage />
            <Footer />

          </>
        } />

        <Route path="*" element={<Page404 />} />
      </Routes>

    </>
  )
}

export default App

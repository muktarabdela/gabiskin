import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import './index.css'
import store from './store'
import CheckoutContextProvider from './Context/checkoutContext.jsx'
// import { AuthProvider } from './Context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CheckoutContextProvider>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <App />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </CheckoutContextProvider>

  </Provider>

)

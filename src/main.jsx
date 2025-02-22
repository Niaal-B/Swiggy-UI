import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx'
import Contact from './components/Contact.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from './components/About.jsx'
import Resmenu from './components/Resmenu.jsx'
import Error from './components/Error.jsx'
import { Provider } from 'react-redux'
import appStore from './components/utils/appstore.js'
import Cart from './components/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
 <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Error/>}/>
        <Route path='/restaurant/:Id' element = {<Resmenu/>} />
        <Route path='/cart' element = {<Cart/>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>

  </Provider>
 
)
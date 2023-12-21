import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import SignIn from './pages/SignIn'
import SingOut from './pages/SingOut'
import About from './pages/About'
import Profile from './pages/Profile'
const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-out' element={<SingOut />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
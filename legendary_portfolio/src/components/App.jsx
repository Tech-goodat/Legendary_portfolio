import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import AboutMe from './AboutMe'
import Projects from './Projects'
import Testimonials from './Testimonials'
import Contact from './Contact'
import Login from './Login'
import SignUp from './SignUp'



const App = () => {
  return (
    <Router>
      <div className='bg-[#f0f9ff] w-full h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutMe />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='testimonials/' element={<Testimonials />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
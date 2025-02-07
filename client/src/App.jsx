import { useState } from 'react'

import './App.css'
import SignIn from './components/Signin'
import SignUp from './components/SignUp'
import Home from './components/Landing'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
<div>
<BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn></SignIn>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>

     </Routes>
     
     </BrowserRouter>
</div>
  )
}

export default App

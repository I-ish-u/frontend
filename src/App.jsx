import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Naavbar from './components/Naavbar'
import Signin from './components/Signin'
import Login from './components/Login'

function App() {
  return (
    <div>
        <BrowserRouter>
        <Naavbar/>
        <Routes>
            <Route element={<Signin/>} path="signup" />
            <Route element={<Login/>} path="login" />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
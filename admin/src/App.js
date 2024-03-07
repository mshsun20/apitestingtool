import React from 'react'
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Leads from './components/leadparts/Leads';
import Leaddet from './components/leadparts/Leaddet';
import Movies from './components/movieparts/Movies';
import Users from './components/userparts/Users'

const App = () => {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/leaddet/:id' element={<Leaddet />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/users' element={<Users />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
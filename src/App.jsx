import { useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Movies from './pages/Movies';
import Customer from './pages/customer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
        </Routes>
    </>
  )
}

export default App

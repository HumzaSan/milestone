import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import FilmsList from './pages/FilmsList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/films-list" element={<FilmsList />}></Route>
    </Routes>
    </>
  )
}

export default App

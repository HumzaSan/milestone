import { useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Search from './pages/Search';
import Customer from './pages/customer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

  return (
    <>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<Search onSearch={handleSearch} />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
        </Routes>
    </>
  )
}

export default App

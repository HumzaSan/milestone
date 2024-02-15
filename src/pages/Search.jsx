import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Container fluid>
            <SearchBar onSearch={handleSearch} />
        </Container>
    );
}
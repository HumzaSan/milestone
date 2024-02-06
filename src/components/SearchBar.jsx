import { Row, Form, InputGroup, Button, Col, Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SearchBar({ query }) {
    const [movieTitle, setMovieTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterByActor, setFilterByActor] = useState(false);
    const [filterByGenra, setFilterByGenra] = useState(false);
    const [modal, setShowModal] = useState(false);

    useEffect(() => {
        if (movieTitle || filterByActor || filterByGenra) { 
            setIsLoading(true);
            fetchSearchResults();
        }
    }, [movieTitle, filterByActor, filterByGenra]);

    const handleSearch = () => {
        fetchSearchResults();
    };

    const handleActorFilter = async () => {
        if (movieTitle || filterByActor) {
            setFilterByActor(!filterByActor);
        }
    };

    const handleGenraFilter = async () => {
        if (movieTitle || filterByGenra) {
            setFilterByGenra(!filterByGenra);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Reset the form (including actor filter) if the movie title is empty
        if (!inputValue) {
            setMovieTitle('');
            setFilterByActor(false);
            setFilterByGenra(false);
            setSearchResults([]);
        } else {
            setMovieTitle(inputValue);
        }
    };

    const fetchSearchResults = async () => {
        try {
            let apiUrl = '';
            if (filterByActor) {
                apiUrl = `http://localhost:3001/searchMoviesActor/${encodeURIComponent(movieTitle)}`;
            } else if (filterByGenra) {
                apiUrl = `http://localhost:3001/searchMoviesGenra/${encodeURIComponent(movieTitle)}`;
            } else {
                apiUrl = `http://localhost:3001/searchMoviesTitle/${encodeURIComponent(movieTitle)}`;
            }

            const response = await fetch(apiUrl);
            
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Search Results:', data);

            if (data.length === 0) {
                setSearchResults([]);
            } else {
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggle = () => setShowModal(!modal);

    return (
        <Row className='justify-content-center'>
            <Col md={8}>
                <Form>
                    <InputGroup size="lg" className="m-2 align-items-center">
                        <Form.Control
                            id='filmSearchBar'
                            placeholder="Film Search"
                            aria-label="Search Movies"
                            aria-describedby="movie-search-input"
                            value={movieTitle}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Filter by Actor"
                            className='mx-4'
                            id="actorFilter"
                            checked={filterByActor}
                            onChange={handleActorFilter}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Filter by genra"
                            className='mx-4'
                            id="actorGenra"
                            checked={filterByGenra}
                            onChange={handleGenraFilter}
                        />
                        <Button variant="outline-danger" id="search-movies-button" onClick={handleSearch}>
                            Find
                        </Button>
                    </InputGroup>
                </Form>
                <div>
                    {isLoading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}

                    {searchResults.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Release Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((movie, index) => (
                                    <tr key={index}>
                                        <td>{movie.film_id}</td>
                                        <td>{movie.title}</td>
                                        <td>{movie.release_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {!isLoading && searchResults.length === 0 && <p>No results found.</p>}
                </div>
            </Col>
        </Row>
    );
}

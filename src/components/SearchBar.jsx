import { Modal, Row, Form, InputGroup, Button, Col, Table, Spinner, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SearchBar({ query }) {
    const [movieTitle, setMovieTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterByActor, setFilterByActor] = useState(false);
    const [filterByGenre, setFilterByGenre] = useState(false);
    const [modal, setShowModal] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [filmDetails, setFilmDetails] = useState({});
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
        if (movieTitle || filterByActor || filterByGenre) {
            setIsLoading(true);
            fetchSearchResults();
        }
    }, [movieTitle, filterByActor, filterByGenre]);

    const handleSearch = () => {
        fetchSearchResults();
    };

    const handleActorFilter = async () => {
        if (movieTitle || filterByActor) {
            setFilterByActor(!filterByActor);
        }
    };

    const handleGenreFilter = async () => {
        if (movieTitle || filterByGenre) {
            setFilterByGenre(!filterByGenre);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Reset the form (including actor filter) if the movie title is empty
        if (!inputValue) {
            setMovieTitle('');
            setFilterByActor(false);
            setFilterByGenre(false);
            setSearchResults([]);
        } else {
            setMovieTitle(inputValue);
        }
    };

    const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
    };

    const fetchSearchResults = async () => {
        try {
            let apiUrl = '';
            if (filterByActor) {
                apiUrl = `http://localhost:3001/searchMoviesActor/${encodeURIComponent(movieTitle)}`;
            } else if (filterByGenre) {
                apiUrl = `http://localhost:3001/searchMoviesGenre/${encodeURIComponent(movieTitle)}`;
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

    const showMovieModal = async (film) => {
        setSelectedFilm(film);
        setShowModal(true);
        try {
            const response = await fetch(`http://localhost:3001/modalFilmDetails/${film.film_id}`);
            const data = await response.json();
            setFilmDetails(data);
        } catch (error) {
            console.error('Error fetching film details:', error);
        }

    };

    // rent button ///////////////
    const rentCustomerMovie = async (filmDetails) => {
        const customerInfo = {
            film_id: filmDetails.film_id,
            customer_id: customerId
        };
        const result = await fetch('http://localhost:3001/customerMovieRental/${customer_id}/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerInfo)
        });
        console.log(result)
        const data = await result.json()
    };
    ///////////////////////////////
    const FilmDetailsModal = () => {
        return (
            <Modal size="lg" centered show={modal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{filmDetails.title || 'Loading...'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {filmDetails.description ? (
                        <Row className='align-items-center'>
                            <Col>
                                <h5>Description:</h5> {filmDetails.description}
                                <h5 className='my-2'>Cast: </h5>{filmDetails.actor_names}
                                <p className='mt-2'><b>Special Features:</b> {filmDetails.special_features}</p>
                            </Col>
                            <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b>Release Year</b> {filmDetails.release_year}</ListGroup.Item>
                                <ListGroup.Item><b>Genre</b> {filmDetails.name}</ListGroup.Item>
                                <ListGroup.Item><b>Rating</b> {filmDetails.rating}</ListGroup.Item>
                                <ListGroup.Item><b>Rental Rate</b> <span className="text-success">${filmDetails.rental_rate}</span></ListGroup.Item>
                            </ListGroup>
                                
                            </Col>
                            {/* rent button associated */}
                            <Form.Group>
                                <Row>
                                    <Form.Control id='CustID' placeholder='Customer ID' value={customerId} onChange={handleCustomerIdChange}></Form.Control>
                                    <Button onClick={() => rentCustomerMovie(filmDetails)}>Rent</Button>
                                </Row>
                            </Form.Group>
                        </Row>
                    ) : (
                        <p>Loading film details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const handleCloseModal = () => setShowModal(false);


    return (
        <>
            <h1 className="text-danger my-2">Search Movies</h1>
            <Row className='justify-content-center'>
                <Col>
                    <Form className='pt-2 pb-4'>
                        <InputGroup size="lg" className="align-items-center">
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
                                label="Filter by genre"
                                className='mx-4'
                                id="actorGenre"
                                checked={filterByGenre}
                                onChange={handleGenreFilter}
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
                                <thead className='h4'>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th className='text-center'>Release Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((film, index) => (
                                        <tr key={index} className='align-items-center'>
                                            <td>{film.film_id}</td>
                                            <td className='text-danger h6'>{film.title}</td>
                                            <td className='text-center'>{film.release_year}</td>
                                            <td className='text-center'>
                                                <Button variant="outline-danger" onClick={() => showMovieModal(film)}>View Details</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        {!isLoading && searchResults.length === 0 && <p>No results found.</p>}
                    </div>
                </Col>
            </Row>
            <FilmDetailsModal></FilmDetailsModal>
        </>
    );
}

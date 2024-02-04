import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useState } from 'react'; // Import useState hook

export default function SearchBar() {
    const [movieTitle, setMovieTitle] = useState(''); // State to hold the movie title input

    const handleSearch = () => {
        // Function to handle the search action
        const apiUrl = `http://localhost:3001/searchMoviesTitle/${movieTitle}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle your data here
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    };

    return (
        <>
            <Row className='justify-content-center'>
                <Form>
                    <InputGroup size="lg" className="m-2 align-items-center">
                        <Form.Control
                            id='filmSearchBar'
                            placeholder="Film Search"
                            aria-label="Search Movies"
                            aria-describedby="movie-search-input"
                            value={movieTitle} // Set the value to the state
                            onChange={(e) => setMovieTitle(e.target.value)} // Update the state on input change
                        />
                        <Button variant="outline-danger" id="search-movies-button" onClick={handleSearch}>
                            Find
                        </Button>
                        <Form.Control
                            placeholder="Actor Search"
                            aria-label="Search Movies"
                            aria-describedby="movies"
                        />
                        <Button variant="outline-danger" id="ballar-movies">
                            Find
                        </Button>
                        <Form.Control
                            placeholder="Genre Search"
                            aria-label="Search Movies"
                            aria-describedby="movies"
                        />
                        <Button variant="outline-danger" id="ballar-movies">
                            Find
                        </Button>
                    </InputGroup>
                </Form>

                {/* <Form>
                        <Row>
                            <InputGroup size="lg" className="m-2 align-items-center">
                                <Form.Control
                                    placeholder="Advanced Search"
                                    aria-label="Search Movies"
                                    aria-describedby="movies"
                                />
                                <Form.Select className='m-2'>
                                    <option>Animation</option>
                                    <option>Drama</option>
                                    <option>Thriller</option>
                                </Form.Select>
                                <Form.Check
                                    type="checkbox"
                                    id="actorNameFilter"
                                    label="Filter by Actor"
                                    className='m-2'
                                />
                                <Button variant="outline-danger" id="ballar-movies">
                                    Find
                                </Button>
                            </InputGroup>
                        </Row>
                    </Form> */}
            </Row>
        </>
    );
};
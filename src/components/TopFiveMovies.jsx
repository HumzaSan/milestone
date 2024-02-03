import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopFiveMovies() {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [filmDetails, setFilmDetails] = useState({});
  
    const filmOpenModal = async (film) => {
      setSelectedFilm(film);
      setShowModal(true);
      try {
        const response = await fetch(`http://localhost:3001/filmDetails/${film.film_id}`);
        const data = await response.json();
        setFilmDetails(data);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };
    const handleCloseModal = () => setShowModal(false);
  
    const FilmDetailsModal = () => {
      return (
        <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{filmDetails.title || 'Loading...'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {filmDetails.description ? (
              <>
                <p>{filmDetails.description}</p>
                <p className='lead'>{filmDetails.release_year}</p>
                <p className='text-success'>${filmDetails.rental_rate}</p>
                <p>{filmDetails.special_features}</p>
              </>
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
    };
  


    const [films, setFilms] = useState([]);

    useEffect(() => {
      const fetchTop5Movies = async () => {
        try {
          const response = await fetch('http://localhost:3001/topfivefilms');
          const data = await response.json();
          setFilms(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchTop5Movies();
    }, []);
  
    return (
    <>
        <h2 className='h1 my-3  text-danger text-center'>Trending Films</h2>
        <Row className='justify-content-center'>
            {films.map((film) => (
                <Col className='my-2' lg="2" md="3" sm="6" key={film.film_id}>
                    <div className='border border-danger rounded p-3'>
                        <h3 className='h5'>{film.title}</h3> - {film.name}
                        <br />
                        <div className="d-grid gap-2">
                            <Button className='mt-4' variant="outline-danger" onClick={() => filmOpenModal(film)} >
                                <FontAwesomeIcon icon={faFilm} style={{ color: "#B197FC", }} />&nbsp;View Details
                            </Button>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
        <FilmDetailsModal></FilmDetailsModal>

    </>
    );
};
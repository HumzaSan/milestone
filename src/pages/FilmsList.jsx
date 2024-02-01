import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FilmsList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchTop5Movies = async () => {
      try {
        const response = await fetch('http://localhost:3001/films');
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTop5Movies();
  }, []);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmDetails, setFilmDetails] = useState({});
  
  const handleOpenModal = async (film) => {
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

  const DetailsModal = () => {
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
            <p className='text-success'>{filmDetails.rental_rate}</p>
            <p>{filmDetails.special_features}</p>
          </>
        ) : (
          <p>Loading details...</p>
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

  return (

    <Container fluid>
      <h2>Top 5 Trending Films</h2>
      <Row className='justify-content-center'>
        {films.map((film) => (
          <div key={film.film_id}>
            <Col className='my-2' lg="4" md="6" sm="12">
              <div className='border border-danger rounded p-3'>
                <h3>{film.title}</h3> - {film.name}
                <br />
                <Button className='mt-4' variant="outline-danger" onClick={() => handleOpenModal(film)} >
                  <FontAwesomeIcon icon={faFilm} style={{ color: "#B197FC", }} />View Details
                </Button>
              </div>
            </Col>
          </div>
        ))}
      </Row>
      <DetailsModal></DetailsModal>
    </Container>
  );
};

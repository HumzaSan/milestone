import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import FilmDetails from './FilmDetails';
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
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const DetailsModal = ({ film }) => {
    return (
      <Modal size="lg" centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{film.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {film.film_id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
          <div className="">
            <Col className='my-2' lg="4" md="6" sm="12">
              <div className='border border-danger rounded p-3' key={film.film_id} >
                <h3>{film.title}</h3> - {film.name}
                <br />
                <Button className='mt-4' variant="outline-danger" onClick={() => handleOpenModal(film)} >
                  <FontAwesomeIcon icon={faFilm} style={{ color: "#B197FC", }} />View Details
                </Button>
              </div>
            </Col>
            <DetailsModal film={film}></DetailsModal>
          </div>
        ))}
      </Row>
    </Container>
  );
};


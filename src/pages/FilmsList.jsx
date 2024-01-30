import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import FilmDetails from './FilmDetails';

export default function FilmsList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/films');
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  return (

    <Container>
      <h1>Films List</h1>
      <Row>
        {films.map((film) => (
          <Col className='border border-danger rounded p-3 m-3'>
            <div key={film.film_id} >
              <h3>{film.title}</h3> - {film.name}
              <Button variant="primary" onClick={handleOpenModal}>
                View Details
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};


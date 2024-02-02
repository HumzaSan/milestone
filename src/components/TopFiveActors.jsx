import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';

export default function TopFiveActors() {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchTop5Actors = async () => {
            try {
                const response = await fetch('http://localhost:3001/topfiveactors');
                const data = await response.json();
                setActors(data);
            } catch (error) {
                console.error('Error fetching actors:', error);
            }
        };

        fetchTop5Actors();
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

    const ActorDetailsModal = () => {
        return (
            <Modal size='lg' centered show={showModal} onHide={handleCloseModal}>
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
                    <Button variant="secondary" onClick={handleCloseModal} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <>
            <Row className='justify-content-center mt-5'>
                <h2 className="text-center h1">Trending Actors</h2>
                {actors.map((actor) => (
                    <Col className='my-2' lg="4" md="6" sm="12" key={actor.actor_id}>
                        <div className='border border-primary rounded p-3'>
                            <h3>{actor.first_name} {actor.last_name}</h3>
                            <p>Movies: {actor.movies}</p>
                            <p>{actor.last_update}</p>
                            <br />
                            <div className="d-grid gap-2">
                                <Button variant='outline-primary' className='mt-4'>
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <ActorDetailsModal></ActorDetailsModal>
        </>
    );
};
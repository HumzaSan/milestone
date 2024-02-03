import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopFiveActors() {

    const [showModal, setShowModal] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);
    const [actorDetails, setActorDetails] = useState([]);

    const actorOpenModal = async (actor) => {
        setSelectedActor(actor);
        setShowModal(true);
        try {
            const response = await fetch(`http://localhost:3001/actorsdetails/${actor.actor_id}`);
            const data = await response.json();
            console.log('Fetched actor details:', data);
            setActorDetails(data);
        } catch (error) {
            console.error('Error fetching actor details:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const ActorDetailsModal = () => {
        return (
            <Modal size='lg' centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{actorDetails.first_name || 'Top 5 movies'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actorDetails.map((detail, index) => (
                        <React.Fragment key={index}>
                            <h4>{detail.title}</h4>
                            <p># of Rentals: {detail.rental_count}</p>
                        </React.Fragment>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

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

    return (
        <>
            <Row className='justify-content-center'>
                <h2 className="text-center h1 my-3 text-primary">Trending Actors</h2>
                {actors.map((actor) => (
                    <Col className='my-2' lg="2" md="3" sm="6" key={actor.actor_id}>
                        <div className='border border-primary rounded p-3'>
                            <h3 className='h5'>{actor.first_name}
                                <br /> {actor.last_name}</h3>
                            <p>Movies: {actor.movies}</p>
                            <p>{actor.last_update}</p>
                            <br />
                            <div className="d-grid gap-2">
                                <Button variant='outline-primary' className='mt-4' onClick={() => actorOpenModal(actor)}>
                                    <FontAwesomeIcon icon={faFilm} style={{ color: "#B197FC", }} />&nbsp;View Details
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <ActorDetailsModal />
        </>
    );
}

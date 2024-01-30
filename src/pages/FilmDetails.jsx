import { Button, Modal } from 'react-bootstrap';

export default function FilmDetails({ movie }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);



    return (
        <><Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Description: {movie.description}</p>
                <p>Release Year: {movie.releaseYear}</p>
                {/* Add more movie details as needed */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};
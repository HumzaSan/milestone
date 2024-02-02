import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

export default function Movies() {
    return (
        <>
            <Row className='justify-content-center'>
                <Col lg={8}>
                    <h1 className='my-3'>Search Movies</h1>

                    <InputGroup size='lg' className="mb-3">
                        <Form.Control
                            placeholder="Search Movies"
                            aria-label="Search Movies"
                            aria-describedby="movies"
                        />
                        <Button variant="outline-danger" id="ballar-movies">
                            Find
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </>
    );
};
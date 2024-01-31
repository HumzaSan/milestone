import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilmsList from './FilmsList';

import Customer from './customer';
export default function HomePage() {
    return(
        <Container>
            <Row>
                <Col>
                    
                    
                    <FilmsList />
                </Col>
            </Row>

        </Container>
    );
}
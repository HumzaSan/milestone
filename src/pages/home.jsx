import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilmsList from './FilmsList';
export default function HomePage() {
    return(
        <Container>
            <Row>
                <Col>
                    <h1>Ballar Sells Movies</h1>
                    <FilmsList />
                </Col>
            </Row>
        </Container>
    );
}
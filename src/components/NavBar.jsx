import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
  return (
    <>
      <Container fluid className="p-0">
        <Navbar collapseOnSelect expand="lg" bg="dark" className='px-4'>
          <Navbar.Brand href="/" className="text-warning d-flex align-items-center">
          <h1><FontAwesomeIcon icon={faTicket} style={{color: "#74C0FC",}} />&nbsp;Ballar Sells Movies</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-warning' />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/customer" className=' text-warning'>Customer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}
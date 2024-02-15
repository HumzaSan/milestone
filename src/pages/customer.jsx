import { Modal, Row, Form, InputGroup, Button, Col, Table, Spinner, ListGroup, Container, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import axios from 'axios'; // Assuming you are using axios for HTTP requests

export default function Customer() {
    const [customerSearch, setCustomerSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filterByID, setFilterByID] = useState(false);
    const [filterByLName, setFilterByLName] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(50);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        if (!inputValue) {
            setCustomerSearch('');
            setFilterByID(false);
            setFilterByLName(false);
            setSearchResults([]);
        } else {
            setCustomerSearch(inputValue);
        }
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoading(true); // Start loading
            try {
                // Adjust the URL and parameters according to your API
                const response = await fetch(`http://localhost:3001/showAllCustomers`);
                const data = await response.json();
                setSearchResults(data); // Assuming the response data is the array of search results
            } catch (error) {
                console.error('Failed to fetch search results:', error);
                setSearchResults([]); // Reset search results on error
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchSearchResults();
    }, []); // Empty dependency array makes this effect run only once on component mount

    // Calculate the current customers to display
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = searchResults.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / customersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col>
                        <h1>Customers</h1>

                        <Form className='pt-2 pb-4'>
                            <InputGroup size="lg" className="align-items-center">
                                <Form.Control
                                    id='searchCustomer'
                                    placeholder="Customer ID / Name"
                                    aria-label="Search Movies"
                                    aria-describedby=" "
                                    value={customerSearch}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <Table striped bordered hover>
                            <thead className='h4'>
                                <tr>
                                    <th className='text-center'>Id</th>
                                    <th className='text-center'>First Name</th>
                                    <th className='text-center'>Last Name</th>
                                    <th className="text-center">View Details</th>
                                    <th className="text-center">Edit Customer</th>
                                    <th className="text-center">Delete Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer, index) => (
                                    <tr key={index} className='align-items-center'>
                                        <td>{customer.customer_id}</td>
                                        <td className='text-danger h6'>{customer.first_name}</td>
                                        <td className='text-center'>{customer.last_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Row>
                <Row>
                    <Pagination>
                        {pageNumbers.map(number => (
                            <Pagination.Item key={number} onClick={() => paginate(number)}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Row>
            </Container>
        </>
    );
};
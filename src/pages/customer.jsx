import { Modal, Row, Form, InputGroup, Button, Col, Table, Spinner, ListGroup, Container, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import axios from 'axios'; // Assuming you are using axios for HTTP requests

export default function Customer() {
    const [customerSearch, setCustomerSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filterByID, setFilterByID] = useState(false);
    const [filterByLName, setFilterByLName] = useState(false);
    const [filterByFName, setFilterByFName] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(50);
    const [deleteCustomer, setDeleteCustomer] = useState(false);

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
        if (filterByFName || filterByID || filterByLName) {
            setIsLoading(true);
            fetchSearchResults();
        }
    }, [customerSearch, filterByID, filterByLName]);

    const handleSearch = () => {
        fetchSearchResults();
    };

    const fetchSearchResults = async () => {
        setIsLoading(true); // Ensure loading state is set at the beginning
        try {
            let apiUrl = '';
            // Explicitly handle all cases
            if (filterByID) {
                apiUrl = `http://localhost:3001/filterByCustomersID/${encodeURIComponent(customerSearch)}`;
            } else if (filterByFName) {
                apiUrl = `http://localhost:3001/filterByCustomersFirstName/${encodeURIComponent(customerSearch)}`;
            } else if (filterByLName) {
                apiUrl = `http://localhost:3001/filterByCustomersLastName/${encodeURIComponent(customerSearch)}`;
            } else {
                // Default to searching by first name if no filter is selected
                apiUrl = `http://localhost:3001/filterByCustomersFirstName/${encodeURIComponent(customerSearch)}`;
                setFilterByFName(true); // Ensure filterByFName is set for default behavior
            }

            console.log(`Fetching data from URL: ${apiUrl}`); // Debugging log

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Search Results:', data); // Debugging log

            if (data.length === 0) {
                setSearchResults([]);
            } else {
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIDFilter = () => {
        setFilterByID(!filterByID);
        setFilterByLName(false);
        setFilterByFName(false);
    };

    const handleCustomerLNameFilter = () => {
        setFilterByLName(!filterByLName);
        setFilterByID(false);
        setFilterByFName(false);
    };

    const handleDeleteCustomer = async (customerID) => {
        try {
            const response = await fetch(`http://localhost:3001/deleteCustomerById/${encodeURIComponent(customerID)}`, {
                method: 'DELETE', // Assuming the backend expects a DELETE request for deleting a customer
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`Customer with ID: ${customerID} deleted successfully.`);
            // Optionally, refresh the search results to reflect the deletion
            setSearchResults(searchResults.filter(customer => customer.customer_id !== customerID));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    }

    const handleAddCustomer = async () => {

    }

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
                                    placeholder="Customer First Name"
                                    aria-label=""
                                    aria-describedby="customerNameFilter"
                                    value={customerSearch}
                                    onChange={handleInputChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Filter by ID"
                                    className='mx-4'
                                    id="customerIDFilter"
                                    checked={filterByID}
                                    onChange={handleIDFilter}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Filter by Last Name"
                                    className='mx-4'
                                    id="customerNameFilter"
                                    checked={filterByLName}
                                    onChange={handleCustomerLNameFilter}
                                />
                            </InputGroup>
                            <Button variant="outline-danger" id="search-customer-button" onClick={handleSearch}>
                                Find
                            </Button>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="outline-primary" id="add-customer-button" onClick={handleAddCustomer}>
                            Add Customer
                        </Button>
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
                                    <th className="text-center">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer, index) => (
                                    <tr key={index} className='align-middle'>
                                        <td>{customer.customer_id}</td>
                                        <td className='text-danger h6'>{customer.first_name}</td>
                                        <td className='text-center'>{customer.last_name}</td>
                                        <td className='justify-content-center d-flex '>
                                            <div className="d-flex gap-1 py-1">
                                                <Button variant='outline-success' className='m-1 px-5'>view</Button>
                                                <Button variant='outline-dark' className='m-1 px-5'>edit</Button>
                                                <Button variant='outline-danger' className='m-1 px-5' onClick={() => handleDeleteCustomer(customer.customer_id)}>delete</Button>
                                            </div>
                                        </td>
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
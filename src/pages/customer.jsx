import { Modal, Row, Form, InputGroup, Button, Col, Table, Spinner, ListGroup, Container, Pagination, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { faCouch, faUsers, faMapLocation, faMagnifyingGlass, faReceipt, faPencil, faTrash, faCircleXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});
    const [dummy, setDummy] = useState({});
    const [userResponses, setUserResponses] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        district: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showCustomerEditModal, setShowCustomerEditModal] = useState(true);

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
        setFormData({});
        setStep(1);
        setShowModal(false);
    }

    const handleAddAddress = () => {
        setFormData({});
        setStep(1);
        setShowModal(true);
    };

    const handleSaveAddress = async () => {
        try {
          const { firstName, lastName, email, address, district, city, postalCode, phoneNumber } = userResponses; // Destructure the required fields
      
          if (!address || !district || !city || !postalCode || !phoneNumber || !firstName || !lastName || !email) {
            console.error('Missing required fields');
            console.log("firstName", firstName);
            console.log("lastName", lastName);
            console.log("email", email);
            console.log("address", address);
            console.log("district", district);
            console.log("city", city);
            console.log("postalCode", postalCode);
            console.log("phone", phoneNumber);
            return;
          }
          
        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("email", email);
          console.log("address", address);
          console.log("district", district);
          console.log("city", city);
          console.log("postalCode", postalCode);
          console.log("phone", phoneNumber);
      
          const requestData = {
            user_first_name: firstName,
            user_last_name: lastName,
            user_email: email,
            user_address: address,
            user_district: district,
            user_city_id: city,
            user_postal_code: postalCode,
            user_phone: phoneNumber
          };
      
          const response = await fetch('http://localhost:3001/addNewCustomerInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          console.log('Responses saved successfully.');
          setShowModal(false); // Close the modal after successful save
        } catch (error) {
          console.error('Error saving responses:', error);
        }
      };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setUserResponses((prevResponses) => ({
            ...prevResponses,
            [field]: value,
        }));
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


    // work on this customer details modal
    const showCustomerModal = async (customer) => {
        setCustomerDetails(customer);
        setShowCustomerDetailsModal(true);
        try {
            const response = await fetch(`http://localhost:3001/getCustomerDetails/${customer.customer_id}`);
            const data = await response.json();
            console.log("this is customer details: ", data);
            setDummy(data);
            CustomerDetailsModal(data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }

    };

    const handleCloseModal = () => setShowCustomerDetailsModal(false);

    const CustomerDetailsModal = () => {
        return (
            <Modal size="lg" dialogClassName="modal-width" centered show={showCustomerDetailsModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='align-items-center'>
                        <Col lg={4}>
                            {Object.keys(dummy).map((key, index) => (
                                index <= 0 && (
                                    <ListGroup variant="flush" key={index}>
                                        <ListGroup.Item className='py-2'><h4>Customer ID: </h4>{dummy[key].customer_id}</ListGroup.Item>
                                        <ListGroup.Item className='py-2'><h4>First: </h4>{dummy[key].first_name}</ListGroup.Item>
                                        <ListGroup.Item className='py-2'><h4>Last: </h4>{dummy[key].last_name}</ListGroup.Item>
                                        <ListGroup.Item className='py-2'><h4>Email: </h4>{dummy[key].email}</ListGroup.Item>
                                        <ListGroup.Item className='py-2'><h4>Phone: </h4>{dummy[key].phone}</ListGroup.Item>
                                    </ListGroup>
                                )
                            ))}
                        </Col>
                        <Col lg={8}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Rental Date</th>
                                        <th>Return Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(dummy).map((key, index) => (
                                        <tr key={index}>
                                            <td>{dummy[key].rental_date}</td>
                                            <td>{dummy[key].return_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const showEditModal = async (customer) => {
        setShowCustomerEditModal(true);
        customerEditModal(customer);
    }

    const handleEditModal = () => setShowCustomerEditModal(false);

    const customerEditModal = () => {
        return (
            <Modal size="lg" dialogClassName="modal-width" centered show={showCustomerEditModal} onHide={handleEditModal}>
                <Modal.Header>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <Form className='pt-2 pb-4'>
                            <InputGroup size="lg" className="align-items-center">
                                <Form.Control
                                        className='form-control-dark'

                                    id='searchCustomer'
                                    placeholder="Search Customers by First Name"
                                    aria-label="Search Customers by First Name"
                                    aria-describedby="customerNameFilter"
                                    value={customerSearch}
                                    //onChange={handleInputChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Filter by ID"
                                    className='mx-4'
                                    id="customerIDFilter"
                                    checked={filterByID}
                                    //onChange={handleIDFilter}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Filter by Last Name"
                                    className='mx-4'
                                    id="customerNameFilter"
                                    checked={filterByLName}
                                    //onChange={handleCustomerLNameFilter}
                                />
                                <Button variant="outline-danger" id="search-customer-button" onClick={handleSearch}>
                                    Find <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputGroup>
                        </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
    )};
    //////////////////////////////////////
    return (
        <>
            <Container>
                <Row className='my-3 align-items-center justify-content-center'>
                    <Col>
                        <h1 className='text-center text-primary'><FontAwesomeIcon icon={faCouch} /> Customers</h1>
                    </Col>
                    <Col lg={3}>
                        <div className='d-grid gap-4'>
                            <Button variant="outline-primary" className='p-3' id="add-customer-button" onClick={handleAddCustomer}>
                                <FontAwesomeIcon icon={faUsers} /> Add Customer
                            </Button>
                            <Button variant="outline-primary" className='p-3' id="add-customer-button" onClick={handleAddAddress}>
                                <FontAwesomeIcon icon={faMapLocation} />     Add Address
                            </Button>
                        </div>
                    </Col >
                </Row>
                <Row className='justify-content-center'>
                    <Col>
                        <Form className='pt-2 pb-4'>
                            <InputGroup size="lg" className="align-items-center">
                                <Form.Control
                                        className='form-control-dark'

                                    id='searchCustomer'
                                    placeholder="Search Customers by First Name"
                                    aria-label="Search Customers by First Name"
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
                                <Button variant="outline-danger" id="search-customer-button" onClick={handleSearch}>
                                    Find <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputGroup>
                        </Form>

                    </Col>
                </Row>
                <Row>

                    <Col>
                        {/* this is for the customer */}
                        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName=''>
                            <Modal.Header closeButton className='dark-mode-background'>
                                <Modal.Title>Enter Address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='dark-mode-background'>
                                {/* Add input fields for 5 responses */}
                                <Form.Group controlId="firstNameResponse">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your first name"
                                        value={userResponses.firstName}
                                        onChange={(e) => handleChange(e, 'firstName')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="lastNameResponse">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your last name"
                                        value={userResponses.lastName}
                                        onChange={(e) => handleChange(e, 'lastName')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="emailResponse">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your email address"
                                        value={userResponses.email}
                                        onChange={(e) => handleChange(e, 'email')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="addressResponse">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your address"
                                        value={userResponses.address}
                                        onChange={(e) => handleChange(e, 'address')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="districtResponse">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your district"
                                        value={userResponses.district}
                                        onChange={(e) => handleChange(e, 'district')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="cityResponse">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-control-dark'
                                        placeholder="Enter your city"
                                        value={userResponses.city}
                                        onChange={(e) => handleChange(e, 'city')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="postalResponse">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className='form-control-dark'
                                        placeholder="Enter your zip-code"
                                        value={userResponses.postalCode}
                                        onChange={(e) => handleChange(e, 'postalCode')}
                                    />
                                </Form.Group>
                                <Form.Group controlId="phoneResponse">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        className='form-control-dark'
                                        placeholder="Enter your phone number"
                                        value={userResponses.phoneNumber}
                                        onChange={(e) => handleChange(e, 'phoneNumber')}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer className='justify-content-between '>

                                <Button variant="outline-secondary" className='mx-2 p-2' onClick={() => setShowModal(false)}>
                                    Close&nbsp;&nbsp; <FontAwesomeIcon icon={faCircleXmark} />
                                </Button>
                                <Button variant="outline-primary" className='mx-2 p-2' onClick={handleSaveAddress}>
                                    Save Responses&nbsp;&nbsp;  <FontAwesomeIcon icon={faPaperPlane} />
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </Col >
                </Row >

                <Row className='justify-content-center'>
                    {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <Col>
                            <Table striped bordered hover className='table-dark'>
                                <thead className='h4'>
                                    <tr>
                                        <th className='text-center'>Id</th>
                                        <th className=''>First Name</th>
                                        <th className=''>Last Name</th>
                                        <th className="text-center">Menu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCustomers.map((customer, index) => (
                                        <tr key={index} className='align-middle'>
                                            <td>{customer.customer_id}</td>
                                            <td className='text-danger h5'>{customer.first_name}</td>
                                            <td className='h5'>{customer.last_name}</td>
                                            <td className='justify-content-center d-flex '>
                                                <div className="d-flex gap-1 py-1">
                                                    <Button variant='outline-success' className='m-1 px-5' onClick={() => showCustomerModal(customer)}><FontAwesomeIcon icon={faReceipt} />&nbsp;&nbsp;view</Button>
                                                    <Button variant='outline-dark' className='m-1 px-5' onClick={() => showEditModal(customer)}><FontAwesomeIcon icon={faPencil} />&nbsp;&nbsp;edit</Button>
                                                    <Button variant='outline-danger' className='m-1 px-5' onClick={() => handleDeleteCustomer(customer.customer_id)}><FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp;delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    )}
                </Row>
                <CustomerDetailsModal></CustomerDetailsModal>
                <Row>
                    <Pagination>
                        {pageNumbers.map(number => (
                            <Pagination.Item key={number} onClick={() => paginate(number)}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Row>
            </Container >
        </>
    );
};
import { useState } from "react";
import { Button, Container, Form, FormControl, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateShowLoadingIcon } from "../../store/slices/searchProductSlice";
import SearchProductUtils from '../../utils/SearchProductUtils';
import NetworkErrorAlert from "../alerts/NetworkError.alert";

// Component to show navbar
const CustomNavbar = (props) => {

    const [searchString, setSearchString] = useState('');

    const [showNetworkErrorMessage, setShowNetworkErrorMessage] = useState(false);
    const dispatch = useDispatch();

    const onChangeSearch = (event) => {
        setSearchString(event.target.value)
    }

    const onClickSubmit = async (event) => {
        event.preventDefault(); // Prevents refresh of page

        console.log("CustomNavbar searchString ", searchString)
        try {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: true
            }))

            const productsJSON = await SearchProductUtils.getProducts(searchString);

            SearchProductUtils.dispatchNewSearchResults(dispatch, productsJSON);
        } catch (error) {
            console.log("CustomNavbar onClickSubmit error", error)
            setShowNetworkErrorMessage(true);
        } finally {
            dispatch(updateShowLoadingIcon({
                showLoadingIcon: false
            }))
        }
    }

    return (
        <Container fluid>
            <Row>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#">Myntra-clone</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <Navbar.Collapse id="responsive-navbar-nav">
                            {/* Contains navigation options */}
                            <Nav className="me-auto">
                                <Nav.Link href="#">MEN</Nav.Link>
                                <Nav.Link href="#">WOMEN</Nav.Link>
                                <Nav.Link href="#">KIDS</Nav.Link>
                                <Nav.Link href="#">HOME & LIVING</Nav.Link>
                                <Nav.Link href="#">OFFERS</Nav.Link>
                            </Nav>

                            {/* Contains search bar */}
                            <Form className="d-flex">
                                <FormControl
                                    onChange={onChangeSearch}
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                />
                                <Button variant="light" onClick={onClickSubmit} onKeyDown={onClickSubmit}>Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </Row>
            <Row>

                {showNetworkErrorMessage === true &&
                    <NetworkErrorAlert
                        onCloseCallback={() => { setShowNetworkErrorMessage(false) }}
                    />
                }
            </Row>
        </Container>
    );
}

export default CustomNavbar;
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const history = useHistory()
    const logOutHandler = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand> ProShop </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart mr-2"></i>Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ?

                                <NavDropdown title={userInfo.name} id='userName'>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>Log Out</NavDropdown.Item>
                                </NavDropdown>

                                :

                                <LinkContainer to="/login">
                                    <Nav.Link> <i className="fas fa-user mr-2"></i>Sign In</Nav.Link>
                                </LinkContainer>

                            }
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header
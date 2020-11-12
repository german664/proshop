import React, { useEffect, useState } from 'react'
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { Button, Col, Form, NavLink, Row } from 'react-bootstrap'


const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])
    return (
        <FormContainer>
            <h1 className="mt-4">Sign in</h1>
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary"> Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? {' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen

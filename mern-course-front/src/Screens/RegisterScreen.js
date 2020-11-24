import React, { useEffect, useState } from 'react'
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState()


    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))

        }
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])
    return (
        <FormContainer>

            <h1 className="mt-4">Sign Up</h1>
            {message && <ErrorMessage variant="danger" >{message}</ErrorMessage>}
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loader></Loader>}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId="name">

                    <Form.Label> Name </Form.Label>

                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="email">

                    <Form.Label>  Email Address  </Form.Label>

                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="password">

                    <Form.Label>  Password  </Form.Label>

                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="confirmPassword">

                    <Form.Label>  Confirm Password  </Form.Label>

                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                </Form.Group>

                <Button type="submit" variant="primary"> Register </Button>

            </Form>

            <Row className="py-3">
                <Col>
                    Already a customer?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Sign In {' '}</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

import React, { useEffect, useState } from 'react'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState()

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password
            }))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, history, userInfo, user])
    return (
        <Row>
            <Col md={3} className="mt-4">
                <h2>User Profile   </h2>
                {message && <ErrorMessage variant="danger" >{message}</ErrorMessage>}
                {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
                {success && <ErrorMessage variant="success" >{'User Updated'}</ErrorMessage>}


                {loading ? <Loader></Loader> :

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

                        <Button type="submit" variant="primary"> Update </Button>

                    </Form>
                }
            </Col>
            <Col md={9} className="mt-4">
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen

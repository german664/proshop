import React, { useEffect, useState } from 'react'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ location, history }) => {

    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


    }, [user, dispatch, id, successUpdate, history])
    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3"> Go Back</Link>
            <h1 className="mt-4">Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading ? <Loader></Loader>

                : error ? <ErrorMessage variant="danger">{error}</ErrorMessage>
                    :
                    <FormContainer>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="name">

                                <Form.Label> Name </Form.Label>

                                <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="email">

                                <Form.Label>  Email Address  </Form.Label>

                                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="isAdmin">
                                <Form.Check label="Is Admin?" type="checkbox" value={isAdmin} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />

                            </Form.Group>


                            <Button type="submit" variant="primary"> Update </Button>

                        </Form>
                    </FormContainer>
            }



        </>
    )
}

export default UserEditScreen

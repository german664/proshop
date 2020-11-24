import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const { loading, users, error } = usersList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1 className="mt-4">Users</h1>
            {loading ? <Loader /> : error ? <ErrorMessage variant="danger">{error}</ErrorMessage> :

                <Table striped bordered hover responsive className="table-sm">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{ "color": "green" }} /> : <i className="fas fa-times" style={{ "color": "red" }} />}</td>
                                <td><LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm"><i className="fas fa-edit" /></Button>
                                </LinkContainer>

                                    <Button variant="danger" className="btn-sm"><i className="fas fa-trash" onClick={() => {
                                        deleteHandler(user._id)
                                    }} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            }
        </>
    )
}

export default UserListScreen

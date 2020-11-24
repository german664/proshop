import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listAllOrders } from '../actions/orderActions'

const OrdersListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    return (
        <>
            <h1 className="mt-4">Users</h1>
            {loading ? <Loader /> : error ? <ErrorMessage variant="danger">{error}</ErrorMessage> :

                <Table striped bordered hover responsive className="table-sm">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? <i className="fas fa-check" style={{ "color": "green" }} /> : <i className="fas fa-times" style={{ "color": "red" }} />}</td>
                                <td>{order.isDelivered ? <i className="fas fa-check" style={{ "color": "green" }} /> : <i className="fas fa-times" style={{ "color": "red" }} />}</td>

                                <td><LinkContainer to={`/order/${order._id}`}>
                                    <Button variant="light" className="btn-sm"><i className="fas fa-edit" />Details</Button>
                                </LinkContainer>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            }
        </>
    )
}

export default OrdersListScreen

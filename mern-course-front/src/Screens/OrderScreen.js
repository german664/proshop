import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader/Loader'


const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch])

    return loading ? <Loader /> : error ? <ErrorMessage variant="danger">{error}</ErrorMessage> :
        (
            <>
                <h1 className="mt-4">Order {order._id}</h1>

                <Row>
                    <Col md={8} >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems === 0
                                    ?
                                    <ErrorMessage variant="primary" >Your cart is empty</ErrorMessage>
                                    :
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item) => {
                                            return <ListGroup.Item key={item.product}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col >
                                                        <Link to={`/product/${item.product}`} > {item.name}</Link>
                                                    </Col>
                                                    <Col md={4} className="border-left">
                                                        {item.qty} x {item.price} = {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        })}
                                    </ListGroup>

                                }
                            </ListGroup.Item>


                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Items
                                    </Col>
                                        <Col>
                                            $ {order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Shipping
                                    </Col>
                                        <Col>
                                            $ {order.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Taxes
                                    </Col>
                                        <Col>
                                            $ {order.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total
                                    </Col>
                                        <Col>
                                            $ {order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error &&
                                        <ErrorMessage variant="danger">{error}</ErrorMessage>
                                    }
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>

                </Row>

            </>
        )
}

export default OrderScreen

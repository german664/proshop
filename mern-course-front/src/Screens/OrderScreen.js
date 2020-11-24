import React, { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { Link } from 'react-router-dom'
import { deliveredOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDelivered = useSelector(state => state.orderDelivered)
    const { success: successDelivered, loading: loadingDelivered } = orderDelivered

    const [sdkReady, setSdkReady] = useState(false)

    const deliveredHandler = () => {
        dispatch(deliveredOrder(order))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => setSdkReady(true)
            document.body.appendChild(script)
        }

        if (!order || order._id !== orderId || successPay || successDelivered) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))

        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDelivered])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }


    return loading ? <Loader /> : error ? <ErrorMessage variant="danger">{error}</ErrorMessage> :
        (
            <>
                <h1 className="mt-4">Order {order._id}</h1>

                <Row>
                    <Col md={8} >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: {order.user.name}</strong></p>
                                <p><strong>Email:   </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}
                                </p>
                                {order.isDelivered ?
                                    <ErrorMessage variant="success" > Delivered on {order.deliveredAt}
                                    </ErrorMessage>
                                    :
                                    <ErrorMessage variant="danger" > Not Delivered Yet
                                </ErrorMessage>
                                }
                                {loadingDelivered && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                                    <Button type="button" className="btn" onClick={deliveredHandler}>Mark as Delivered</Button>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ?
                                    <ErrorMessage variant="success" > Paid on {order.paidAt}
                                    </ErrorMessage>
                                    :
                                    <ErrorMessage variant="danger" > Not Paid Yet
                                </ErrorMessage>
                                }

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
                                {!order.isPaid &&
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> :
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        }
                                    </ListGroup.Item>

                                }

                            </ListGroup>
                        </Card>
                    </Col>

                </Row>

            </>
        )
}

export default OrderScreen

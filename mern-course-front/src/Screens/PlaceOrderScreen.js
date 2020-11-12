import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error, loading } = orderCreate

    const placeOrderHandler = (e) => {
        dispatch(createOrder({ orderItems: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod, itemsPrice: cart.itemsPrice, shippingPrice: cart.shippingPrice, taxesPrice: cart.taxesPrice, totalPrice: cart.totalPrice }))
    }

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
    cart.taxesPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxesPrice)

    useEffect(() => {
        if (success) {
            history.push(`order/${order._id}`)
        }
    }
        , [history, success])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4>

            </CheckoutSteps>
            <Row>
                <Col md={8} >
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.country}, {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems === 0
                                ?
                                <ErrorMessage variant="primary" >Your cart is empty</ErrorMessage>
                                :
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item) => {
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
                                        $ {cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        $ {cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Taxes
                                    </Col>
                                    <Col>
                                        $ {cart.taxesPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        $ {cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error &&
                                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Purchase</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen

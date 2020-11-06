import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'


const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const handleChange = (id, e) => {
        dispatch(addToCart(id, Number(e)))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    return (
        <Row>
            <Col md={8}>
                <h1 className="mt-4">Shopping Cart</h1>
                {cartItems.length === 0 ?

                    <ErrorMessage variant="info"><div className="d-flex justify-content-between"><span className="d-flex align-items-center">Your cart is empty </span><span className="btn btn-info rounded-lg"> <Link to="/">Go Back</Link></span></div></ErrorMessage>

                    :

                    (<ListGroup variant={"flush"}>
                        {cartItems.map(item => {
                            return (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} rounded fluid />
                                        </Col>
                                        <Col md={3}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                        <Col md={2}>{item.price}</Col>
                                        <Col md={2}>

                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => handleChange(item.product, e.target.value)}
                                            >
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => {
                                                        return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2} classname="d-flex align-items-center">

                                            <Button type="button" variant="light" onClick={() => {
                                                removeFromCartHandler(item.product)
                                            }}><i className="fa fa-trash "></i></Button>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>)

                }

            </Col>

            <Col md={4}>
                <Card className="mt-4">

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                            <h4 className="text-center mt-3"> ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block" disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </Col>


        </Row>
    )
}

export default CartScreen

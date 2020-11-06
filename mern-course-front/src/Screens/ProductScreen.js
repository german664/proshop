import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating/Rating'
import { productDetail } from '../actions/productsActions'
import Loader from '../components/Loader/Loader'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

const ProductScreen = ({ history }) => {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetail)
    const { error, loading, product } = productDetails
    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }
    const handleChange = (e) => {
        setQty(e.target.value)
    }
    useEffect(() => {
        dispatch(productDetail(id))
    }, [dispatch, id])

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {loading
                ?
                <Loader />
                :
                error ?
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3} >
                            <ListGroup variant={"flush"}>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span>${product.price}</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <p>{product.description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                    </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>

                                            <Col>
                                                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 &&
                                        <ListGroup.Item>
                                            <Row>

                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={handleChange}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map(x => {
                                                                return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            })
                                                        }
                                                    </Form.Control>

                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    }
                                    <ListGroup.Item>
                                        <Button className="btn-block" type="button" disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >Add To Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>
            }
        </>
    )

}

export default ProductScreen

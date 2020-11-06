import React, { useEffect, } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product/Product"
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productsActions'
import Loader from '../components/Loader/Loader'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

const HomeScreen = () => {
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            {loading
                ?
                <Loader />
                :
                error ?
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                    :
                    <Row>
                        {products.map(product => {
                            return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        })}
                    </Row>
            }
        </div>
    )
}

export default HomeScreen

import React, { useEffect, } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product/Product"
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productsActions'
import Loader from '../components/Loader/Loader'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Pagination/Paginate'

const HomeScreen = ({ match }) => {
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
    const { keyword } = useParams()
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <div>
            {loading
                ?
                <Loader />
                :
                error ?
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                    :
                    <>
                        <Row>
                            {products.map(product => {
                                return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                    <Product product={product} />
                                </Col>
                            })}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
            }
        </div>
    )
}

export default HomeScreen

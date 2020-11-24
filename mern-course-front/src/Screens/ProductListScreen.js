import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProduct, listProducts, createProduct } from '../actions/productsActions'
import Paginate from '../components/Pagination/Paginate'

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch()
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading, products, error, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, product: createdProduct, error: errorCreate, success: successCreate } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, successDelete, userInfo, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3"
                        onClick={createProductHandler}
                    > <i className="fa fa-plus" /> Create Product</Button>
                </Col>

            </Row>
            {loadingCreate && <Loader />}
            {errorCreate && <ErrorMessage variant="danger"> {errorCreate}</ErrorMessage>}
            {loadingDelete && <Loader />}
            {errorDelete && <ErrorMessage variant="danger"> {errorDelete}</ErrorMessage>}
            {loading ? <Loader /> : error ? <ErrorMessage variant="danger">{error}</ErrorMessage> :
                <>
                    <Table striped bordered hover responsive className="table-sm">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit" /></Button>
                                    </LinkContainer>

                                        <Button variant="danger" className="btn-sm"><i className="fas fa-trash" onClick={() => {
                                            deleteHandler(product._id)
                                        }} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <Paginate pages={pages} page={page} keyword={""} isAdmin={true} />
                </>
            }
        </>
    )
}

export default ProductListScreen

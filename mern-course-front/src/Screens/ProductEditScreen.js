import React, { useEffect, useState } from 'react'
import { productDetail, updateProduct } from '../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants'
import axios from 'axios'

const ProductEditScreen = ({ history }) => {

    const { id: productId } = useParams()
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name, price, image, category, countInStock, description, brand
        }))
    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                'Content-Type': 'multipart/form-data',
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setBrand(product.brand)

            }
        }
    }, [dispatch, history, productId, product, successUpdate])
    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3"> Go Back</Link>
            <h1 className="mb-4 text-center">Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>}
            {loading ? <Loader></Loader>

                : error ? <ErrorMessage variant="danger">{error}</ErrorMessage>
                    :
                    <FormContainer>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="name">

                                <Form.Label> Name </Form.Label>

                                <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="price">

                                <Form.Label> Price </Form.Label>

                                <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="image">

                                <Form.Label> Image </Form.Label>

                                <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

                                <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}>

                                </Form.File>
                                {uploading && <Loader />}
                            </Form.Group>


                            <Form.Group controlId="brand">

                                <Form.Label> Brand </Form.Label>

                                <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="countInStock">

                                <Form.Label> Count In Stock </Form.Label>

                                <Form.Control type="number" placeholder="Enter category" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="category">

                                <Form.Label> Category </Form.Label>

                                <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />

                            </Form.Group>

                            <Form.Group controlId="category">

                                <Form.Label> Description </Form.Label>

                                <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />

                            </Form.Group>

                            <Button type="submit" variant="primary"> Update </Button>

                        </Form>
                    </FormContainer>
            }

        </>
    )
}

export default ProductEditScreen

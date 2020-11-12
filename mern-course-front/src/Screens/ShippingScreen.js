import React, { useState } from 'react'
import { saveShippingAddress } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1={true} step2={true}></CheckoutSteps>
            <h2 className="mt-4 ">Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">

                    <Form.Label> Address </Form.Label>

                    <Form.Control type="text" placeholder="Enter Address" value={address} required onChange={(e) => setAddress(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="city">

                    <Form.Label> City </Form.Label>

                    <Form.Control type="city" required placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="postalCode">

                    <Form.Label> Postal Code </Form.Label>

                    <Form.Control type="text" required placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />

                </Form.Group>

                <Form.Group controlId="country">

                    <Form.Label> Country </Form.Label>

                    <Form.Control type="text" required placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} />

                </Form.Group>
                <Button type="submit" variant="primary"> Continue</Button>
            </Form>


        </FormContainer>
    )
}

export default ShippingScreen

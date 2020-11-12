import React, { useState } from 'react'
import { savePaymentMethod } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import { Button, Form, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'

const PaymentMethodScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
            <h2 className="mt-4 ">Payment</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="Paypal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        {/*  <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary"> Continue</Button>
            </Form>


        </FormContainer>
    )
}

export default PaymentMethodScreen

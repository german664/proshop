import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// Create new order
// POST /api/orders
// Access: Private  

export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No items in the cart')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            shippingPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// Get order by ID
// GET /api/orders/:id
// Access: Private  

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order does not exist')
    }
})
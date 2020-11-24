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

// UPDATE ORDER TO PAID
// PUT /api/orders/:id/pay
// Access: Private  

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order does not exist')
    }
})

// Get logged in user orders
// GET /api/orders/myorders/
// Access: Private  

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})

// Get all orders
// GET /api/orders/
// Access: Private  

export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')

    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('There are no orders')
    }
})

// Update order to delivered
// GET /api/orders/:id/delivered
// Access: Private  


export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order does not exist')
    }
})
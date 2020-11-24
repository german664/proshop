import express from 'express'
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js'
import { isAnAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()


router.route('/').post(protect, addOrderItems).get(protect, isAnAdmin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivered').put(protect, isAnAdmin, updateOrderToDelivered)




export default router
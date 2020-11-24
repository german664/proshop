import express from 'express'
import { getProducts, getProductByID, deleteProductByID, createProduct, updateProduct, createReview } from '../controllers/productController.js'
import { protect, isAnAdmin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getProducts).post(protect, isAnAdmin, createProduct)
router.route('/:id/reviews').post(protect, createReview)
router.route('/:id').get(getProductByID).delete(protect, isAnAdmin, deleteProductByID).put(protect, isAnAdmin, updateProduct)

export default router
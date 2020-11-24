import express from 'express'
import { authUser, getUserProfile, registerUser, updateUser, getAllUsers, deleteUser, getUserById, updateUserByAdmin } from '../controllers/userController.js'
import { protect, isAnAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()


router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
router.route('/').post(registerUser).get(protect, isAnAdmin, getAllUsers)
router.route('/:id').delete(protect, isAnAdmin, deleteUser).get(protect, isAnAdmin, getUserById).put(protect, isAnAdmin, updateUserByAdmin)



export default router
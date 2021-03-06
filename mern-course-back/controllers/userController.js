import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

// Auth user & get token
// POST /api/users/login
// Access: Public

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' })
}

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// Auth user & get token
// POST /api/users/login
// Access: Public

export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// Create User
// POST /api/users/login
// Access: Public

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
})

// Update User
// PUT /api/users/login
// Access: Public

export const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.status(200)
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// Get All Users
// GET /api/users/login
// Access: Private

export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    if (users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

// Delete User
// DELETE /api/users/:id
// Access: Private


export const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: "User Removed" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// Get User By ID
// GET /api/users/:id
// Access: Private

export const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

// Update User By ID
// PUT /api/users/:id
// Access: Private

export const updateUserByAdmin = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
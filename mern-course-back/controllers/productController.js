import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// FETCH ALL PRODUCTS
// GET /api/products
// Access: Public

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// FETCH SINGLE PRODUCT
// GET /api/
// Access: Public

export const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})
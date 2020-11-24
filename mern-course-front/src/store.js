import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createReviewReducer, productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer, userListReducer, deleteUserReducer, updateUserReducer } from './reducers/userReducers'
import { myOrdersReducer, orderCreateReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: userListReducer,
    userDelete: deleteUserReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDelivered: orderDeliveredReducer,
    orderMyList: myOrdersReducer,
    orderList: orderListReducer,
    userUpdate: updateUserReducer,
    productDelete: productDeleteReducer,
    createReview: createReviewReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const userPaymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : { address: '', postalCode: '', city: '', country: '' }

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: userPaymentMethod
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
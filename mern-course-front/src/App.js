import React from "react"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { Container } from "react-bootstrap"
import HomeScreen from "./Screens/HomeScreen"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from "./Screens/ProductScreen"
import CartScreen from "./Screens/CartScreen"
import LoginScreen from "./Screens/LoginScreen"
import RegisterScreen from "./Screens/RegisterScreen"
import ProfileScreen from "./Screens/ProfileScreen"
import ShippingScreen from "./Screens/ShippingScreen"
import PaymentMethodScreen from "./Screens/PaymentMethodScreen"
import PlaceOrderScreen from "./Screens/PlaceOrderScreen"
import OrderScreen from "./Screens/OrderScreen"
import UserListScreen from "./Screens/UserListScreen"
import UserEditScreen from "./Screens/UserEditScreen"
import ProductListScreen from "./Screens/ProductListScreen"
import ProductEditScreen from "./Screens/ProductEditScreen"
import OrdersListScreen from "./Screens/OrdersListScreen"

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrdersListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />

        </Container>

      </main>
      <Footer />

    </Router >
  );
}

export default App;

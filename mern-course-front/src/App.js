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

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </Container>

      </main>
      <Footer />

    </Router >
  );
}

export default App;

import React from "react"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { Container } from "react-bootstrap"
import HomeScreen from "./Screens/HomeScreen"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from "./Screens/ProductScreen"
import CartScreen from "./Screens/CartScreen"

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>

      </main>
      <Footer />

    </Router >
  );
}

export default App;

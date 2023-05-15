import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartContext } from "./CartContext";
import NavBar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      const parsedItems = JSON.parse(items).filter((item) => item.quantity > 0);
      setCartItems(parsedItems);
      localStorage.setItem("cartItems", JSON.stringify(parsedItems));
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop/:productId" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </Router>
      </CartContext.Provider>
    </div>
  );
}

export default App;

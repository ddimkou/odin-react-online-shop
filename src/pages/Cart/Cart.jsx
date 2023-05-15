import "./cart.css";
import React, { useContext, useState } from "react";
import { CartContext } from "../../CartContext";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const decrementQuantity = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (itemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[itemIndex].quantity -= 1;
      if (updatedItems[itemIndex].quantity === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  };

  const incrementQuantity = (item) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const calculateTotalPrice = () => {
    return groupedItems
      .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleApplyOrder = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className="cart-content">
      <div className="cart-container">
        <h1>My Cart</h1>
        {groupedItems.length > 0 ? (
          <>
            {groupedItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img className="itemImg" src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="functionality">
                    <button
                      className="increment"
                      onClick={() => incrementQuantity(item)}
                    >
                      +
                    </button>
                    <div className="quantity">{item.quantity}</div>
                    <button
                      className="decrement"
                      onClick={() => decrementQuantity(item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="total-price">Total: ${calculateTotalPrice()}</div>
            <button
              className={`apply-order ${isOrderPlaced ? "done" : ""}`}
              onClick={handleApplyOrder}
            >
              {isOrderPlaced ? "DONE" : "Apply Order"}
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { CartContext } from "../CartContext";

function NavBar() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="mr-auto">
        Mara
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href="/shop" className="mr-2">
            Shop
          </Nav.Link>
          <Nav.Link href="/cart" className="mr-2">
            Cart <i className="bi bi-cart"></i>
            <span className="cart-quantity">{totalQuantity}</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

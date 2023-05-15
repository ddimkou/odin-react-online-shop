import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import "./shop.css";

function Shop() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const menResponse = fetch(
        "https://fakestoreapi.com/products/category/men's clothing"
      );
      const womenResponse = fetch(
        "https://fakestoreapi.com/products/category/women's clothing"
      );
      const [menData, womenData] = await Promise.all([
        menResponse,
        womenResponse,
      ]).then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      );
      setProducts([...menData, ...womenData]);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="row products">
      {products.map((product) => (
        <div className="col-md-3 mb-3" key={product.id}>
          <Card>
            <Link to={`/shop/${product.id}`}>
              <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Button
                variant="dark"
                className="addToCart"
                onClick={() => addToCart({ ...product, quantity: 1 })}
              >
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Shop;

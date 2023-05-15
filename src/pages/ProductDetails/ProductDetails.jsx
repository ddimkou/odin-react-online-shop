import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CartContext } from "../../CartContext";
import "./productDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const productData = await response.json();
      setProduct(productData);
      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, price, description, category, image, rating } = product;
  return (
    <div className="product-content">
      <div className="product-details">
        <img className="product-image" src={image} alt={title} />
        <h3 className="product-title">{title}</h3>
        <p className="product-price">Price: ${price}</p>
        <p className="product-description">Description: {description}</p>
        <p className="product-category">Category: {category}</p>
        <p className="product-rating">
          Rating: {rating.rate} ({rating.count} reviews)
        </p>
        <Button
          variant="dark"
          className="addToCart"
          onClick={() => addToCart({ ...product, quantity: 1 })}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;

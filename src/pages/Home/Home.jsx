import "./home.css";
import React from "react";
import { Link } from "react-router-dom";
import landing from "../../assets/landing.jpg";
import landing2 from "../../assets/landing2.jpg";

function Home() {
  console.log("home works");
  return (
    <div className="home">
      <div className="img-container">
        <img src={landing} alt="" />
        <div className="wrap">
          <h2>Summer Collection</h2>
          <Link to="/shop">
            <button className="shop-button">SHOP NOW</button>
          </Link>
        </div>
      </div>
      <div className="img-container">
        <img src={landing2} alt="" />
        <div className="wrap">
          <h2>OUR CAVE OF WONDERS</h2>
          <Link to="/shop">
            <button className="shop-button">EXPLORE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

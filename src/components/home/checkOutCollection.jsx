import React from "react";
import Image1 from "../../assets/img1.jpg";
import Image2 from "../../assets/img2.jpg";
import { Link } from "react-router-dom";

function CheckOutCollection() {
  return (
    <section className="CheckOutCollection">
      <img loading="eager" src={Image1} alt="two rings" />
      <div>
        <img loading="eager" src={Image2} alt="golden ring" />
        <div>
          <h1>Check Out Our Collections</h1>
          <p>
            Check Out Our Collections Many desktop publishing packages and web
            page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' still in their infancy.Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their
          </p>
          <Link to={"/shop"} className="shopNowBtn">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CheckOutCollection;

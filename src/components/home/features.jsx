import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
function Features() {
  return (
    <section className="Features">
      <Feature
        Logo={LocalShippingIcon}
        head={"Free shipping"}
        text={"on order over 100$"}
      />
      <Feature
        Logo={LocalShippingIcon}
        head={"Support online"}
        text={"call:(123) 123 444 555"}
      />
      <Feature
        Logo={LocalShippingIcon}
        head={"Special Gift"}
        text={"Special gift for Members"}
      />
      <Feature
        Logo={LocalShippingIcon}
        head={"security payment"}
        text={"Venaim consequeter frenk furtre"}
      />
    </section>
  );
}

function Feature({ head, text, Logo }) {
  return (
    <div className="feature">
      <Logo style={{ fontSize: "2rem" }} />
      <div className="feature-text">
        <h1>{head}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
export default Features;

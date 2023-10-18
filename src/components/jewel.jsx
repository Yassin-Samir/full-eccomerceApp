import { useState } from "react";
import { Link } from "react-router-dom";

function Jewel({ src, name, brand, price, priceId }) {
  const [Hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/shop/${name}`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="jewel">
        <div>
          <img
            className={Hovered ? "JewelHovered" : ""}
            src={src[Hovered ? 0 : 1]}
            alt=""
            loading="lazy"
          />
        </div>
        <h1>{brand}</h1>
        <p>{name}</p>
        <p className="JewelPrice">From ${price}</p>
      </div>
    </Link>
  );
}

export default Jewel;

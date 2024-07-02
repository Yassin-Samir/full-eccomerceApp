import { Box } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function Jewel({ src, name, brand, price, priceId }) {
  const [Hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/shop/${name}`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{ width: "fit-content" }}
    >
      <div className="jewel">
        <Box overflow={"hidden"} width={"100%"} height={"100%"}>
          <img
            className={Hovered ? "JewelHovered" : ""}
            src={src[Hovered ? 0 : 1]}
            alt=""
            loading="eager"
          />{" "}
        </Box>
        <h1>{brand}</h1>
        <p>{name}</p>
        <p className="JewelPrice">From ${price}</p>
      </div>
    </Link>
  );
}

export default Jewel;

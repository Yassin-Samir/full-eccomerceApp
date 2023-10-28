import React from "react";
import { useSelector } from "react-redux";
import { jewelleryPreviewItemSelector } from "../../redux/selectors";
import Jewel from "../jewel";

function PreviewedItems() {
  const jewels = useSelector(jewelleryPreviewItemSelector);
  return (
    <div className="ShopJewels">
      {jewels &&
        Object.keys(jewels).map((key, ind) => (
          <Jewel
            key={ind + 1}
            src={jewels[`${key}`]?.src}
            name={key}
            brand={jewels[`${key}`]?.brand}
            price={jewels[`${key}`]?.price}
            priceId={jewels[`${key}`]?.priceId}
          />
        ))}
    </div>
  );
}

export default PreviewedItems;

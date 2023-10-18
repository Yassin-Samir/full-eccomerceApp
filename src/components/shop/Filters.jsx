import { useState } from "react";
import { Slider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const brands = [
  "Xara",
  "Tanishq",
  "Turban",
  "Goldless",
  "Goldie",
  "Diamond Square",
  "Spike",
];
const colors = ["Silver", "Gold", "Black"];
function FilterBrands({ EditFilters, searchParams }) {
  const [Open, setOpen] = useState(false);
  const Brands = searchParams || [];
  const addFilter = ({ target: { value, checked } }) => {
    EditFilters((prev) => ({
      ...prev,
      BRAND: checked
        ? [...prev.BRAND, value]
        : prev.BRAND?.filter((brand) => brand !== value),
    }));
  };
  return (
    <div className={`filterMenu ${Open ? "Open" : ""}`}>
      <div className="header" onClick={() => setOpen((prev) => !prev)}>
        <p>Brand</p>
        <ArrowDownwardIcon
          sx={{
            transition: "transform 0.5s linear",
            transform: Open ? "rotate(180deg)" : "",
          }}
        />
      </div>
      <ul className="brandFilters">
        {brands &&
          brands.map((brand, ind) => (
            <li key={ind + 1}>
              <input
                type="checkbox"
                checked={
                  Brands.findIndex((searchBrand) => searchBrand === brand) !==
                  -1
                }
                onChange={addFilter}
                value={brand}
                id={brand}
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          ))}
      </ul>
    </div>
  );
}
function FilterPrice({ EditFilters, searchParams }) {
  const [Open, setOpen] = useState(false);
  const [Price, setPrice] = useState(
    searchParams
      ? searchParams.split("-").map((Price) => Number(Price))
      : [500, 950]
  );
  const handleChange = (event, value) => {
    setPrice(value);
  };

  const FilterPrice = () => {
    EditFilters((prev) => ({ ...prev, PRICE: Price }));
  };
  return (
    <div className={`filterMenu ${Open ? "Open" : ""}`}>
      <div className="header" onClick={() => setOpen((prev) => !prev)}>
        <p>Price</p>
        <ArrowDownwardIcon
          sx={{
            transition: "transform 0.5s linear",
            transform: Open ? "rotate(180deg)" : "",
          }}
        />
      </div>
      <div className="PriceSlider">
        <Slider
          getAriaLabel={() => "Price range"}
          value={Price}
          onChange={handleChange}
          min={500}
          max={950}
          valueLabelDisplay="auto"
          sx={{
            width: "90%",
            color: "rgb(232, 168, 110)",
            alignSelf: "center",
          }}
        />
        <p style={{ alignSelf: "center" }}>{Price.join(" - ")}</p>
        <button className="filterPriceBtn" onClick={FilterPrice}>
          Filter
        </button>
      </div>
    </div>
  );
}
function FilterColor({ EditFilters, searchParams }) {
  const [Open, setOpen] = useState(false);
  const Colors = searchParams || [];
  const addFilter = ({ target: { checked, value } }) => {
    EditFilters((prev) => ({
      ...prev,
      COLOR: checked
        ? [...prev.COLOR, value]
        : prev.COLOR.filter((color) => color !== value),
    }));
  };
  return (
    <div className={`filterMenu ${Open ? "Open" : ""}`}>
      <div className="header" onClick={() => setOpen((prev) => !prev)}>
        <p>Color</p>
        <ArrowDownwardIcon
          sx={{
            transition: "transform 0.5s linear",
            transform: Open ? "rotate(180deg)" : "",
          }}
        />
      </div>
      <ul>
        {colors &&
          colors.map((Color, ind) => (
            <li key={ind + 1}>
              <input
                type="checkbox"
                checked={
                  Colors.findIndex((searchColor) => searchColor === Color) !==
                  -1
                }
                onChange={addFilter}
                value={Color}
                id={Color}
              />
              <label htmlFor={Color}>{Color}</label>
            </li>
          ))}
      </ul>
    </div>
  );
}
export { FilterBrands, FilterColor, FilterPrice };

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filter } from "../../redux/slices/jewellery";
import { FilterBrands, FilterColor, FilterPrice } from "./Filters";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const BRANDS = searchParams.getAll("BRAND");
  const PRICE = searchParams.get("PRICE");
  const Color = searchParams.getAll("COLOR");
  const [Filters, setFilters] = useState({
    BRAND: BRANDS,
    PRICE: PRICE ? PRICE.split("-") : [],
    COLOR: Color,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const SearchParams = new URLSearchParams();
    Filters.BRAND.forEach((brand) => {
      SearchParams.append("BRAND", brand);
    });
    Filters.PRICE.length &&
      SearchParams.append("PRICE", Filters.PRICE.join("-"));
    Filters.COLOR.forEach((color) => SearchParams.append("COLOR", color));
    setSearchParams(SearchParams);
    dispatch(filter());
  }, [Filters]);

  return (
    <div className="filter">
      <p>Filter:</p>
      <FilterBrands EditFilters={setFilters} searchParams={BRANDS} />
      <FilterPrice EditFilters={setFilters} searchParams={PRICE} />
      <FilterColor EditFilters={setFilters} searchParams={Color} />
    </div>
  );
}

export default Filter;

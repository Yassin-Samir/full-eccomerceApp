import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchJewellery = createAsyncThunk(
  "jewellery/fetchJewellery",
  async () => {
    try {
      const jewelleryPromise = fetch(
        "https://jewelleryapp-9f048-default-rtdb.europe-west1.firebasedatabase.app/data.json"
      );
      return await (await jewelleryPromise).json();
    } catch (error) {
      throw error.message;
    }
  }
);

const jewellery = createSlice({
  name: "jewellery",
  initialState: {
    Loading: false,
    jewels: null,
    previewedJewels: null,
    error: null,
  },
  reducers: {
    filter(state) {
      const SearchParams = new URLSearchParams(location.search);
      const brandsFilters = SearchParams.getAll("BRAND");
      const priceFilters = SearchParams.get("PRICE")
        ? SearchParams.get("PRICE").split("-")
        : [];
      const colorsFilters = SearchParams.getAll("COLOR");
      let filteredItems = Object.entries(state.jewels);
      brandsFilters.length &&
        (filteredItems = filteredItems.filter(
          ([name]) => brandsFilters.indexOf(state.jewels[name].brand) !== -1
        ));
      priceFilters.length &&
        (filteredItems = filteredItems.filter(
          ([name]) =>
            Number(state.jewels[name].price) >= +priceFilters[0] &&
            Number(state.jewels[name].price) <= +priceFilters[1]
        ));
      colorsFilters.length &&
        (filteredItems = filteredItems.filter(([name]) =>
          colorsFilterHelper(state.jewels[name].colors, colorsFilters)
        ));
      state.previewedJewels = Object.fromEntries(filteredItems);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJewellery.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(fetchJewellery.fulfilled, (state, action) => {
      state.Loading = false;
      state.jewels = action.payload;
      state.previewedJewels = action.payload;
    });
    builder.addCase(fetchJewellery.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
  },
});
const colorsFilterHelper = (jewelColors, filteredColors) => {
  for (let index = 0; index < jewelColors.length; index++) {
    const JewelColor = jewelColors[index];
    if (filteredColors.indexOf(JewelColor) !== -1) return true;
  }
  return false;
};
export const { filter } = jewellery.actions;
export default jewellery.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJewellery = createAsyncThunk(
  "jewellery/fetchJewellery",
  async () => {
    try {
      const jewelleryPromise = fetch(
        "https://jewellery--store-default-rtdb.europe-west1.firebasedatabase.app/data.json"
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
          (item) => brandsFilters.indexOf(state.jewels[item[0]]["brand"]) !== -1
        ));
      priceFilters.length &&
        (filteredItems = filteredItems.filter(
          (item) =>
            +state.jewels[item[0]]["price"] >= +priceFilters[0] &&
            +state.jewels[item[0]]["price"] <= +priceFilters[1]
        ));
      colorsFilters.length &&
        (filteredItems = filteredItems.filter((item) =>
          colorsFilterHelper(state.jewels, colorsFilters, item[0])
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
const colorsFilterHelper = (data, filters, item) => {
  for (let index = 0; index < data[item]["colors"].length; index++) {
    const color = data[item]["colors"][index];
    if (filters.indexOf(color) === -1) continue;
    return true;
  }
  return false;
};
export const { filter } = jewellery.actions;
export default jewellery.reducer;

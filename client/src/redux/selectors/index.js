import { createSelector } from "@reduxjs/toolkit";

export const jewellerySelector = createSelector(
  ({ jewellery }) => jewellery,
  ({ jewels, Loading, error }) => ({ jewels, Loading, error })
);
export const jewelleryItemSelector = createSelector(
  ({ jewellery }) => jewellery,
  ({ jewels }) => jewels
);
export const jewelleryPreviewItemSelector = createSelector(
  ({ jewellery }) => jewellery,
  ({ previewedJewels }) => previewedJewels
);
export const customJewelImgSelector = (jewelName) =>
  createSelector(
    ({ jewellery }) => jewellery,
    ({ jewels }) => jewels[jewelName].src
  );
export const customJewelPropsSelector = (jewelName) =>
  createSelector(
    ({ jewellery }) => jewellery,
    ({ jewels }) => jewels[jewelName]
  );
export const credentialSelector = createSelector(
  (state) => state,
  ({ credentials }) => credentials
);
export const isItemInCartSelector = (name) =>
  createSelector(
    ({ cart }) => cart,
    ({ cartItems }) =>
      cartItems.findIndex(({ name: cartName }) => cartName === name) !== -1
  );
export const isAddingItemSelector = createSelector(
  ({ cart }) => cart,
  (cart) => cart.isAddingItem
);
export const LoggedInSelector = createSelector(
  ({ credentials }) => credentials,
  ({ LoggedIn }) => LoggedIn
);
export const UserSelector = createSelector(
  (state) => state,
  ({ credentials }) => credentials
);
export const CartSelector = createSelector(
  ({ cart }) => cart,
  ({ cartItems, total, error, IsLoading }) => ({
    cartItems,
    total,
    error,
    IsLoading,
  })
);

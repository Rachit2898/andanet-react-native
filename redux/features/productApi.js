import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getToken,
  addItems,
  deleteItems,
  emptyCart,
  updateValue,
  cartValidate,
  checkOutCart,
} from "../../utils";

export const addItem = createAsyncThunk("additems", async (body) => {
  const result = await addItems(body);
  return result;
});
export const deleteItem = createAsyncThunk("deleteitems", async (body) => {
  const result = await deleteItems(body);
  return result;
});
export const emptyCartItems = createAsyncThunk("emptyCart", async (body) => {
  const result = await emptyCart(body);
  return result;
});
export const updateValues = createAsyncThunk("updateValue", async (body) => {
  const result = await updateValue(body);
  return result;
});
export const cartValidating = createAsyncThunk("cartValidating", async () => {
  const result = await cartValidate();
  return result;
});
export const cartCheckOut = createAsyncThunk(
  "cartCheckOut",
  async (orderId) => {
    const result = await checkOutCart(orderId);
    return result;
  }
);

export const bestInStock = createAsyncThunk("urls/bestInStock", async () => {
  const token = await getToken();
  const url =
    "https://staging.andanet.com/api/customer/inventory-notification/inventory-watch/search?pageSize=4&availability=Available  ";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();

  return myData;
});
export const yourTopPurChase = createAsyncThunk(
  "urls/topPurchase",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/product-list/49020/search?pageSize=4&availability=Available  ";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const checkOutConfirmation = createAsyncThunk(
  "urls/checkoutConfirm",
  async (orderId) => {
    console.log("apiOrderId", orderId);
    const token = await getToken();
    const url = `https://staging.andanet.com/checkout/confirmation/${orderId}  `;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const customerLikeYou = createAsyncThunk(
  "urls/customerLikeYou",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/product-list/97580/search?pageSize=4&availability=Available&previouslyPurchased=Not%20Previously%20Purchased ";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const preNegotiatedItems = createAsyncThunk(
  "urls/preNegotiatedItems",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/upsell/Pre%20Negotiated%20Items?pageSize=4&availability=Available&previouslyPurchased=Previously%20Purchased";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const userInfo = createAsyncThunk("urls/userInfo", async () => {
  const token = await getToken();
  const url = "https://staging.andanet.com/api/customer";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});
export const cartInfo = createAsyncThunk("urls/cartInfo", async () => {
  const token = await getToken();
  const url = "https://staging.andanet.com/api/cart";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});
export const inventoryWatch = createAsyncThunk(
  "urls/inventoryWatch",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/product-list/49020/search";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const backInStockSeeMore = createAsyncThunk(
  "urls/backInStockSeeMore",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/product-list/23164/search";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const customerLikeYouSeeMore = createAsyncThunk(
  "urls/customerLikeYouSeeMore",
  async () => {
    const token = await getToken();
    const url =
      "https://staging.andanet.com/api/customer/product-list/97580/search";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const searchItems = createAsyncThunk(
  "urls/searchItem",
  async (searchItem) => {
    const token = await getToken();
    console.log({ searchItem });
    const url = `https://staging.andanet.com/api/catalog/search/suggest?q=${searchItem}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: {},
    topPurchaseProducts: {},
    customerLikeYouProducts: {},
    preNegotiatedItemsProducts: {},
    userInfoData: {},
    cartInfoData: {},
    inventoryWatchData: {},
    cartLength: [],
    visibleData: [],
    cartValidateInfo: {},
    itemLength: {},
    cartCheckOutInfo: false,
    backInStockSeeMoreData: {},
    customerLikeYouSeeMoreData: {},
    checkOutData: {},
    searchItem: [],
  },
  extraReducers: {
    [searchItems.pending]: (state, action) => {
      state.loading = true;
    },
    [searchItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchItem = action.payload;
      console.log(action.payload);
    },
    [searchItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [bestInStock.pending]: (state, action) => {
      state.loading = true;
    },
    [bestInStock.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [bestInStock.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [yourTopPurChase.pending]: (state, action) => {
      state.loading = true;
    },
    [yourTopPurChase.fulfilled]: (state, action) => {
      state.loading = false;
      state.topPurchaseProducts = [action.payload];
    },
    [yourTopPurChase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [customerLikeYou.pending]: (state, action) => {
      state.loading = true;
    },
    [customerLikeYou.fulfilled]: (state, action) => {
      state.loading = false;
      state.customerLikeYouProducts = [action.payload];
    },
    [customerLikeYou.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [preNegotiatedItems.pending]: (state, action) => {
      state.loading = true;
    },
    [preNegotiatedItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.preNegotiatedItemsProducts = [action.payload];
    },
    [preNegotiatedItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [userInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [userInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfoData = [action.payload];
    },
    [userInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [cartInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartInfoData = [action.payload];
      state.cartLength = action.payload?.orderItems?.length;

      state.visibleData = action.payload?.orderItems?.map((i) => {
        return i.quantity;
      });
    },
    [cartInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [inventoryWatch.pending]: (state, action) => {
      state.loading = true;
    },
    [inventoryWatch.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventoryWatchData = [action.payload];
    },
    [inventoryWatch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addItem.pending]: (state, action) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength += 1;
    },
    [addItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteItem.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.loading = false;

      state.visibleData = action.payload?.order?.orderItems?.map((i) => {
        return i.quantity;
      });

      state.cartLength -= 1;
    },
    [deleteItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [emptyCartItems.pending]: (state, action) => {
      state.loading = true;
    },
    [emptyCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = 0;
    },
    [emptyCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateValues.pending]: (state, action) => {
      state.loading = true;
    },
    [updateValues.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength += 1;
    },
    [updateValues.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartValidating.pending]: (state, action) => {
      state.loading = true;
    },
    [cartValidating.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartValidateInfo = action.payload;
    },
    [cartValidating.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartCheckOut.pending]: (state, action) => {
      state.loading = true;
    },
    [cartCheckOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartCheckOutInfo = true;
      state.cartLength = 0;
      state.itemLength = action.payload?.orderItems?.length;
      state.checkOutData = action.payload;
    },
    [cartCheckOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [checkOutConfirmation.pending]: (state, action) => {
      state.loading = true;
    },
    [checkOutConfirmation.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = 0;
    },
    [checkOutConfirmation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [backInStockSeeMore.pending]: (state, action) => {
      state.loading = true;
    },
    [backInStockSeeMore.fulfilled]: (state, action) => {
      state.loading = false;
      state.backInStockSeeMoreData = action.payload;
    },
    [backInStockSeeMore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [customerLikeYouSeeMore.pending]: (state, action) => {
      state.loading = true;
    },
    [customerLikeYouSeeMore.fulfilled]: (state, action) => {
      state.loading = false;
      state.customerLikeYouSeeMoreData = action.payload;
    },
    [customerLikeYouSeeMore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default productSlice.reducer;

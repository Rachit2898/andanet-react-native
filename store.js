import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./redux/features/authUser";
import productReducer from "./redux/features/productApi";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

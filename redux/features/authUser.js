import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../utils";
import { login } from "../../utils";

export const signin = createAsyncThunk("signin", async (body) => {
  const result = await login(body);
  return result;
});

const initialState = {
  token: "",
  loading: false,
  isAuthenticated: false,
};

const authReducer = createSlice({
  name: "token",
  initialState,

  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
    authenticate: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout, authenticate } = authReducer.actions;
export default authReducer.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { shopApi } from "../services/shopService";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";

import shopReducer from "../features/shopSlice";
import cartReducer from '../features/cartSlice';
import authReducer from "../features/authSlice";
import orderReducer from "../features/orderSlice";



const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    authReducer,
    orderReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
    .concat(userApi.middleware)
});

setupListeners(store.dispatch)

export default store
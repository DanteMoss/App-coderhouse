import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    categorySelected: '',
    productIdSelected: 0,
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload
    },
    setProductIdSelected: (state, action) => {
      state.productIdSelected = action.payload
    }
  }
});

export const { 
  setCategorySelected, 
  setProductIdSelected,
} = shopSlice.actions;

export default shopSlice.reducer;
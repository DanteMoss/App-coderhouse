import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      updatedAt: Date.now().toLocaleString(),
      total: 0,
      items: []
    }
  },
  reducers: {
    addItem: (state, action) => {
      const productRepeted = state.value.items.find(
        (item) => item.id === action.payload.id
      )
      if (productRepeted) {
        const itemUpdated = state.value.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity
            return item
          }
          return item
        })
        const total = itemUpdated.reduce((acc, currentItem) => acc += currentItem.price * currentItem.quantity, 0)
        state.total = total
        state.value = {
          ...state.value,
          items: itemUpdated,
          total,
          updatedAt: Date.now().toLocaleString(),
        }
      } else {
        state.value.items.push(action.payload)
        const total = state.value.items.reduce((acc, currentItem) => acc += currentItem.price * currentItem.quantity, 0)
        state.total = total
        state.value = {
          ...state.value,
          total,
          updatedAt: Date.now().toLocaleString(),
        }
      }
    },
    removeItem: (state, action) => {
      if(state.value.items.length > 0) {
        const itemsUpdated = state.value.items.filter(item => item.id !== action.payload)
        const total = itemsUpdated.reduce((acc, currentItem) => acc += currentItem.price * currentItem.quantity, 0)
        state.total = total
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: Date.now().toLocaleString(),
        }
      }
    },
    cleanCart: (state, action) => {
      state.value.total = 0
      state.value.items = []
    }
  }
})


export const { 
  addItem, 
  removeItem,
  cleanCart
} = cartSlice.actions

export default cartSlice.reducer
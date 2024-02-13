import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: []
  },
  reducers: {
    addOrder: (state, action) => {
      const orderRepeted = state.orders.find ((order) => order.orderId === action.payload.orderId)

      if (orderRepeted) {
        console.log("Orden ya existente")
        return
      }
      else {
        state.orders.push(action.payload)
      }
    }
  }

})


export const {
  addOrder
} = orderSlice.actions

export default orderSlice.reducer
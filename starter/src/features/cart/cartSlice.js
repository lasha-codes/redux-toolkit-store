import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((product) => {
        return product.id !== itemId
      })
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount += 1
    },
  },
})

export const { clearCart, removeItem, increase } = cartSlice.actions

export default cartSlice.reducer

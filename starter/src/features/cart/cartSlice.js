import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkApi) => {
    try {
      console.log(thunkApi.getState())
      const response = await axios.get(url)
      return response.data
    } catch (error) {}
  }
)

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
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => {
        return item.id === payload
      })
      if (cartItem.amount === 1) {
        state.cartItems = state.cartItems.filter((item) => {
          return item.id !== payload
        })
      } else {
        cartItem.amount -= 1
      }
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total.toFixed(2)
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer

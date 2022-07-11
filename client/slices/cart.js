import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [{ test: 'test' }],
  reducers: {},
  extraReducers: {},
})

export default cartSlice.reducer
export const cartSelector = (state) => state.cart

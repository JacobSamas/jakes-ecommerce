import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [
    { id: 1, name: 'Home', details: '123 Main Street, Springfield' },
    { id: 2, name: 'Work', details: '456 Elm Street, Shelbyville' },
  ],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload);
    },
    updateAddress(state, action) {
      const { id, name, details } = action.payload;
      const index = state.addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        state.addresses[index] = { id, name, details };
      }
    },
    deleteAddress(state, action) {
      state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
    },
  },
});

export const { addAddress, updateAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;

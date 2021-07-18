import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RatesState {
  value: number;
}

const initialState: RatesState = {
  value: 0,
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, incrementByAmount } = ratesSlice.actions;

export default ratesSlice.reducer;

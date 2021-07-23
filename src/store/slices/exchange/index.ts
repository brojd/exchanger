import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import numeral from 'numeral';
import { exchange } from 'store/shared/actions';
import { initialState as accountsInitialState } from '../accounts';

export interface ExchangeState {
  currencyFrom: string;
  currencyTo: string;
  valueFrom: string;
  valueTo: string;
}

export const initialState: ExchangeState = {
  currencyFrom: accountsInitialState.accounts[0].currency,
  currencyTo: accountsInitialState.accounts[1].currency,
  valueFrom: '',
  valueTo: '',
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    changeCurrencyFrom: (state, { payload }: PayloadAction<string>) => {
      if (payload === state.currencyTo.toLowerCase())
        state.currencyTo = state.currencyFrom;
      state.currencyFrom = payload;
    },
    changeCurrencyTo: (state, { payload }: PayloadAction<string>) => {
      if (payload === state.currencyFrom.toLowerCase())
        state.currencyFrom = state.currencyTo;
      state.currencyTo = payload;
    },
    changeValueFrom: (
      state,
      {
        payload: { value, rate },
      }: PayloadAction<{ value: string; rate: number }>
    ) => {
      state.valueFrom = value;
      state.valueTo = value ? numeral(value).multiply(rate).format('0.00') : '';
    },
    changeValueTo: (
      state,
      {
        payload: { value, rate },
      }: PayloadAction<{ value: string; rate: number }>
    ) => {
      state.valueTo = value;
      state.valueFrom = value
        ? numeral(value)
            .multiply(1 / rate)
            .format('0.00')
        : '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchange, (state) => {
      state.valueFrom = '';
      state.valueTo = '';
    });
  },
});

export const {
  changeCurrencyFrom,
  changeCurrencyTo,
  changeValueFrom,
  changeValueTo,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;

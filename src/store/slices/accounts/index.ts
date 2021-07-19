import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountsState {
  accounts: { id: string; currency: string; balance: number }[];
}

export const initialState: AccountsState = {
  accounts: [
    {
      id: '1',
      currency: 'USD',
      balance: 44.33,
    },
    {
      id: '2',
      currency: 'EUR',
      balance: 123.33,
    },
    {
      id: '3',
      currency: 'GBP',
      balance: 444.33,
    },
  ],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    exchange: (
      state,
      {
        payload: { currencyFrom, currencyTo, value },
      }: PayloadAction<{
        currencyFrom: string;
        currencyTo: string;
        value: number;
      }>
    ) => ({
      ...state,
      accounts: state.accounts.map((account) => ({
        ...account,
        balance:
          account.currency === currencyFrom
            ? account.balance - value
            : account.currency === currencyTo
            ? account.balance + value
            : account.balance,
      })),
    }),
  },
});

export const { exchange } = accountsSlice.actions;

export default accountsSlice.reducer;

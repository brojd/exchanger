import { createSlice } from '@reduxjs/toolkit';
import numeral from 'numeral';
import { exchange } from 'store/shared/actions';

export interface AccountsState {
  accounts: { id: string; currency: string; balance: number | null }[];
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
      balance: 144.33,
    },
  ],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      exchange,
      (
        state,
        { payload: { currencyFrom, currencyTo, valueFrom, valueTo } }
      ) => {
        console.log('accountsss', JSON.stringify(state));
        console.log({
          currencyFrom,
          currencyTo,
        });
        state.accounts = state.accounts.map((account) => ({
          ...account,
          balance:
            account.currency.toLowerCase() === currencyFrom.toLowerCase()
              ? numeral(account.balance)
                  .subtract(numeral(valueFrom).value())
                  .value()
              : account.currency.toLowerCase() === currencyTo.toLowerCase()
              ? numeral(account.balance)
                  .add(numeral(valueTo).value())
                  .value()
              : account.balance,
        }));
      }
    );
  },
});

export default accountsSlice.reducer;

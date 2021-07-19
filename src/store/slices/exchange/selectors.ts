import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectExchange = (state: RootState) => state.exchange;

export const selectCurrencyFromAndTo = createDraftSafeSelector(
  selectExchange,
  ({ currencyFrom, currencyTo }) => ({
    currencyFrom: currencyFrom.toLocaleLowerCase(),
    currencyTo: currencyTo.toLocaleLowerCase(),
  })
);

export const selectValueFromAndTo = createDraftSafeSelector(
  selectExchange,
  ({ valueFrom, valueTo }) => ({
    valueFrom,
    valueTo,
  })
);

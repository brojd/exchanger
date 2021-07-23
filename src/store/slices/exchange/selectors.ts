import { createDraftSafeSelector } from '@reduxjs/toolkit';
import numeral from 'numeral';
import { RootState } from 'store/store';
import { selectAccountByCurrency } from '../accounts/selectors';

export const selectExchange = (state: RootState) => state.exchange;

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

export const isExchangeButtonDisabled = createDraftSafeSelector(
  selectCurrencyFromAndTo,
  selectValueFromAndTo,
  (state) => state,
  ({ currencyFrom }, { valueFrom }, state) =>
    (numeral(valueFrom || 0).value() || 0) >=
    (selectAccountByCurrency(state, currencyFrom)?.balance || 0)
);

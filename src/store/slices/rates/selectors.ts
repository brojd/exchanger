import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectRates = (state: RootState) => state.rates;

export const selectRatesValue = createDraftSafeSelector(
  selectRates,
  (rates) => rates.value
);

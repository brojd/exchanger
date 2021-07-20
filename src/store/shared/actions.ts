import { createAction } from '@reduxjs/toolkit';

const NAMESPACE = 'shared';

export const exchange = createAction<{
  currencyFrom: string;
  currencyTo: string;
  valueFrom: string;
  valueTo: string;
}>(`${NAMESPACE}/exchange`);

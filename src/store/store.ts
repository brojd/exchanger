import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fxApi } from 'services/api/fx';
import accounts from './slices/accounts';
import exchange from './slices/exchange';

export const store = configureStore({
  reducer: {
    exchange,
    accounts,
    [fxApi.reducerPath]: fxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fxApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

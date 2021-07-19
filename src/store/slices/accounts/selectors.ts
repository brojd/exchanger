import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectAccounts = (state: RootState) => state.accounts;

export const selectAllAccounts = createDraftSafeSelector(
  selectAccounts,
  ({ accounts }) => accounts
);

export const selectAccountById = createDraftSafeSelector(
  selectAccounts,
  (_: RootState, id: string) => id,
  ({ accounts }, id) => accounts.find((account) => account.id === id)
);

export const selectAccountByCurrency = createDraftSafeSelector(
  selectAccounts,
  (_: RootState, currency: string) => currency,
  ({ accounts }, currency) =>
    accounts.find(
      (account) =>
        account.currency.toLocaleLowerCase() === currency.toLowerCase()
    )
);

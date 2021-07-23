import { exchange } from 'store/shared/actions';
import { rootInitialState } from 'store/store';
import reducer, { initialState } from './';
import {
  selectAccountByCurrency,
  selectAccountById,
  selectAccountsCurrencies,
  selectAllAccounts,
} from './selectors';

describe('accounts slice', () => {
  const state = {
    accounts: [
      {
        id: '1',
        currency: 'USD',
        balance: 10,
      },
      {
        id: '2',
        currency: 'EUR',
        balance: 22,
      },
      {
        id: '3',
        currency: 'PLN',
        balance: 34,
      },
    ],
  };

  describe('reducer', () => {
    it('should return initial state by default', () => {
      expect(reducer(undefined, { type: 'fakeAction' })).toEqual(initialState);
    });
    describe('exchange action', () => {
      const newState = reducer(
        state,
        exchange({
          currencyFrom: 'eur',
          currencyTo: 'usd',
          valueFrom: '12',
          valueTo: '10',
        })
      );
      it('should subtract balance correctly', () => {
        const eurAccount = newState.accounts.find(
          ({ currency }) => currency === 'EUR'
        );
        expect(eurAccount?.balance).toBe(10);
      });
      it('should add balance correctly', () => {
        const usdAccount = newState.accounts.find(
          ({ currency }) => currency === 'USD'
        );
        expect(usdAccount?.balance).toBe(20);
      });
      it('should not change the account that does not participate in the transaction', () => {
        const plnAccountInState = state.accounts.find(
          ({ currency }) => currency === 'PLN'
        );
        const plnAccountInNewState = newState.accounts.find(
          ({ currency }) => currency === 'PLN'
        );
        expect(plnAccountInState).toEqual(plnAccountInNewState);
      });
    });
    describe('selectors', () => {
      const rootState = { ...rootInitialState, accounts: state };
      describe('selectAllAccounts', () => {
        it('should return all accounts', () => {
          expect(selectAllAccounts(rootState)).toEqual(state.accounts);
        });
      });
      describe('selectAccountsCurrencies', () => {
        it('should return all accounts currencies', () => {
          expect(selectAccountsCurrencies(rootState)).toEqual([
            'USD',
            'EUR',
            'PLN',
          ]);
        });
      });
      describe('selectAccountById', () => {
        it('should return account with the given id', () => {
          expect(selectAccountById(rootState, '1')).toEqual(state.accounts[0]);
        });
      });
      describe('selectAccountByCurrency', () => {
        it('should return account with the given currency', () => {
          expect(selectAccountByCurrency(rootState, 'usd')).toEqual(
            state.accounts[0]
          );
        });
      });
    });
  });
});

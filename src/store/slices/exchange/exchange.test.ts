import { exchange } from 'store/shared/actions';
import { rootInitialState } from 'store/store';
import reducer, {
  changeCurrencyFrom,
  changeCurrencyTo,
  changeValueFrom,
  changeValueTo,
  initialState,
} from '.';
import {
  isExchangeButtonDisabled,
  selectExchange,
  selectValueFromAndTo,
} from './selectors';

describe('exchange slice', () => {
  describe('reducer', () => {
    it('should return initial state by default', () => {
      expect(reducer(undefined, { type: 'fakeAction' })).toEqual(initialState);
    });

    describe('changeCurrencyFrom action', () => {
      it('should change currencyFrom', () => {
        expect(
          reducer(initialState, changeCurrencyFrom('chf')).currencyFrom
        ).toBe('chf');
      });
      it('should invert currencies if payload is the same as currencyTo', () => {
        expect(
          reducer(
            { ...initialState, currencyFrom: 'pln', currencyTo: 'chf' },
            changeCurrencyFrom('chf')
          ).currencyTo
        ).toBe('pln');
      });
      it('should not invert currencies if payload is not the same as currencyTo', () => {
        expect(
          reducer(
            { ...initialState, currencyFrom: 'pln', currencyTo: 'chf' },
            changeCurrencyFrom('usd')
          ).currencyTo
        ).toBe('chf');
      });
    });
    describe('changeCurrencyTo action', () => {
      it('should change currencyTo', () => {
        expect(reducer(initialState, changeCurrencyTo('chf')).currencyTo).toBe(
          'chf'
        );
      });
      it('should invert currencies if payload is the same as currencyFrom', () => {
        expect(
          reducer(
            { ...initialState, currencyFrom: 'pln', currencyTo: 'chf' },
            changeCurrencyTo('pln')
          ).currencyFrom
        ).toBe('chf');
      });
      it('should not invert currencies if payload is not the same as currencyFrom', () => {
        expect(
          reducer(
            { ...initialState, currencyFrom: 'pln', currencyTo: 'chf' },
            changeCurrencyTo('usd')
          ).currencyFrom
        ).toBe('pln');
      });
    });
    describe('changeValueFrom', () => {
      it('should change valueFrom to the payload value', () => {
        expect(
          reducer(initialState, changeValueFrom({ value: '456', rate: 2 }))
            .valueFrom
        ).toBe('456');
      });
      it('should recalculate valueTo considering the rate', () => {
        expect(
          reducer(initialState, changeValueFrom({ value: '456', rate: 2 }))
            .valueTo
        ).toBe('912.00');
      });
    });
    describe('changeValueTo', () => {
      it('should change valueTo to the payload value', () => {
        expect(
          reducer(initialState, changeValueTo({ value: '456', rate: 2 }))
            .valueTo
        ).toBe('456');
      });
      it('should recalculate valueFrom considering the rate', () => {
        expect(
          reducer(initialState, changeValueTo({ value: '456', rate: 2 }))
            .valueFrom
        ).toBe('228.00');
      });
    });
    describe('exchange action', () => {
      it('should reset valueFrom and valueTo', () => {
        const newState = reducer(
          { ...initialState, valueFrom: '1', valueTo: '2' },
          exchange({
            currencyFrom: 'eur',
            currencyTo: 'usd',
            valueFrom: '12',
            valueTo: '10',
          })
        );
        expect(newState.valueFrom).toBe('');
        expect(newState.valueTo).toBe('');
      });
    });
    describe('selectors', () => {
      const rootState = {
        ...rootInitialState,
        exchange: {
          currencyFrom: 'PLN',
          currencyTo: 'USD',
          valueFrom: '100',
          valueTo: '200',
        },
      };
      describe('selectExchange', () => {
        it('should return exchange state', () => {
          expect(selectExchange(rootState)).toEqual(rootState.exchange);
        });
      });
      describe('selectValueFromAndTo', () => {
        it('should return exchange valueFrom and valueTo', () => {
          expect(selectValueFromAndTo(rootState)).toEqual({
            valueFrom: rootState.exchange.valueFrom,
            valueTo: rootState.exchange.valueTo,
          });
        });
      });
      describe('isExchangeButtonDisabled', () => {
        it('should return true if valueFrom is greater than the balance of accountFrom', () => {
          expect(
            isExchangeButtonDisabled({
              ...rootState,
              accounts: {
                accounts: [{ id: '1', currency: 'USD', balance: 5 }],
              },
              exchange: {
                ...rootState.exchange,
                currencyFrom: 'USD',
                valueFrom: '7',
              },
            })
          ).toBe(true);
        });
        it('should return true if valueFrom equals the balance of accountFrom', () => {
          expect(
            isExchangeButtonDisabled({
              ...rootState,
              accounts: {
                accounts: [{ id: '1', currency: 'USD', balance: 7 }],
              },
              exchange: {
                ...rootState.exchange,
                currencyFrom: 'USD',
                valueFrom: '7',
              },
            })
          ).toBe(true);
        });
        it('should return false if valueFrom is less than the balance of accountFrom', () => {
          expect(
            isExchangeButtonDisabled({
              ...rootState,
              accounts: {
                accounts: [{ id: '1', currency: 'USD', balance: 7 }],
              },
              exchange: {
                ...rootState.exchange,
                currencyFrom: 'USD',
                valueFrom: '6',
              },
            })
          ).toBe(false);
        });
      });
    });
  });
});

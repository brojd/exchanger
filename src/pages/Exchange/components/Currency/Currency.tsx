import NumberInput from 'components/NumberInput/NumberInput';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { FC } from 'react';
import { fxApi } from 'services/api/fx';
import { selectAccountByCurrency } from 'store/slices/accounts/selectors';
import { changeValueFrom, changeValueTo } from 'store/slices/exchange';
import {
  selectCurrencyFromAndTo,
  selectValueFromAndTo,
} from 'store/slices/exchange/selectors';
import { currencyNameToPrefixMap } from 'utils/currency';

interface CurrencyProps {
  isCurrencyTo?: boolean;
}

const Currency: FC<CurrencyProps> = ({ isCurrencyTo }) => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  const { valueFrom, valueTo } = useAppSelector(selectValueFromAndTo);
  const { data } = fxApi.endpoints.getRate.useQueryState(currencies);
  const { currencyFrom, currencyTo } = currencies;
  const rate = data?.[currencyTo];
  const currency = isCurrencyTo ? currencyTo : currencyFrom;
  const currentAccount = useAppSelector((state) =>
    selectAccountByCurrency(state, currency)
  );
  const accountFrom = useAppSelector((state) =>
    selectAccountByCurrency(state, currencyFrom)
  );

  const onChange = (value: string) => {
    if (rate)
      dispatch(
        (isCurrencyTo ? changeValueTo : changeValueFrom)({
          value,
          rate,
        })
      );
  };

  console.log({
    accountFrom,
    rate,
  });

  return accountFrom && currentAccount && rate ? (
    <div>
      <div>
        CURRENCY {isCurrencyTo ? 'TO' : 'FROM'}: {currency}
      </div>
      <div>
        you have: {currencyNameToPrefixMap[currency]}
        {currentAccount.balance}
      </div>
      <div>
        MAX:{' '}
        {!isCurrencyTo ? currentAccount.balance : accountFrom.balance * rate}
        <NumberInput
          max={
            !isCurrencyTo ? currentAccount.balance : accountFrom.balance * rate
          }
          onChange={onChange}
          value={isCurrencyTo ? valueTo : valueFrom}
        />
      </div>
    </div>
  ) : null;
};

export default Currency;

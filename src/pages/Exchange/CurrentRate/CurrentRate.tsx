import { useAppSelector } from 'hooks/store';
import { FC } from 'react';
import { fxApi } from 'services/api/fx';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';
import { currencyNameToPrefixMap } from 'utils/currency';

interface CurrentRateProps {}

const CurrentRate: FC<CurrentRateProps> = (props) => {
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  const { data } = fxApi.endpoints.getRate.useQueryState(currencies);
  const { currencyFrom, currencyTo } = currencies;
  const rate = data?.[currencies.currencyTo];

  return rate ? (
    <div>
      {currencyNameToPrefixMap[currencyFrom]}1 = {rate}
      {currencyNameToPrefixMap[currencyTo]}
    </div>
  ) : null;
};

export default CurrentRate;

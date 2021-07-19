import { useAppSelector } from 'hooks/store';
import { FC } from 'react';
import { fxApi } from 'services/api/fx';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';

interface CurrentRateProps {}

const CurrentRate: FC<CurrentRateProps> = (props) => {
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  const { data } = fxApi.endpoints.getRate.useQueryState(currencies);
  return (
    <div>CURRENT RATE: {JSON.stringify(data?.[currencies.currencyTo])}</div>
  );
};

export default CurrentRate;

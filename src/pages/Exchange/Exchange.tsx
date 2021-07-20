import { useAppSelector } from 'hooks/store';
import { useGetRateQuery } from 'services/api/fx';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';
import Currency from './components/Currency/Currency';
import CurrentRate from './CurrentRate/CurrentRate';
import ExchangeButton from './ExchangeButton/ExchangeButton';

const Exchange = () => {
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  const { data } = useGetRateQuery(currencies, {
    pollingInterval: 10000,
  });

  return (
    <>
      {JSON.stringify(data)}
      <CurrentRate />
      <Currency />
      <Currency isCurrencyTo />
      <ExchangeButton />
    </>
  );
};

export default Exchange;

import { Text } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/store';
import { fxApi } from 'services/api/fx';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';
import { currencyNameToPrefixMap } from 'utils/currency';

const CurrentRate = () => {
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  const { data } = fxApi.endpoints.getRate.useQueryState(currencies);
  const { currencyFrom, currencyTo } = currencies;
  const rate = data?.[currencies.currencyTo];

  return rate ? (
    <Text
      fontSize={{ base: '2xl', md: '5xl' }}
      color="white"
      py="8"
      textAlign="center"
      fontWeight="600"
    >
      1{currencyNameToPrefixMap[currencyFrom]} = {rate}
      {currencyNameToPrefixMap[currencyTo]}
    </Text>
  ) : null;
};

export default CurrentRate;

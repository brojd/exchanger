import { Box } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/store';
import { useGetRateQuery } from 'services/api/fx';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';
import Currency from './components/Currency/Currency';
import CurrentRate from './CurrentRate/CurrentRate';
import ExchangeButton from './ExchangeButton/ExchangeButton';

const Exchange = () => {
  const currencies = useAppSelector(selectCurrencyFromAndTo);
  useGetRateQuery(currencies, {
    pollingInterval: 10000,
  });

  return (
    <>
      <CurrentRate />
      <Box d={{ base: 'block', md: 'flex' }}>
        <Currency />
        <Currency isCurrencyTo />
      </Box>
      <Box d="flex" flexDir="column" alignItems="center" mt="6">
        <ExchangeButton />
      </Box>
      <Box pos="absolute" bottom="6" left="50%" transform="translateX(-50%)">
        <a href="https://www.freeforexapi.com">
          <img
            alt="Free Forex API"
            src="https://www.freeforexapi.com/images/link.png"
            height="20"
          />
        </a>
      </Box>
    </>
  );
};

export default Exchange;

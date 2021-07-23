import { Box, Stat, StatHelpText, StatLabel, Text } from '@chakra-ui/react';
import NumberInput from 'components/NumberInput/NumberInput';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import numeral from 'numeral';
import { FC } from 'react';
import { fxApi } from 'services/api/fx';
import { selectAccountByCurrency } from 'store/slices/accounts/selectors';
import { changeValueFrom, changeValueTo } from 'store/slices/exchange';
import {
  selectCurrencyFromAndTo,
  selectValueFromAndTo,
} from 'store/slices/exchange/selectors';
import { currencyNameToPrefixMap } from 'utils/currency';
import ChooseCurrency from './ChooseCurrency/ChooseCurrency';

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

  return accountFrom && currentAccount && rate ? (
    <Box mb="8" d={{ base: "flex", md: "block" }} justifyContent="space-between" alignItems="center">
      <Box w="50%">
        <Stat>
          <StatLabel color="white">{isCurrencyTo ? 'To' : 'From'}</StatLabel>
          <ChooseCurrency isCurrencyTo={isCurrencyTo} currency={currency} />
          <StatHelpText color="white">
            you have: {currentAccount.balance}
            {currencyNameToPrefixMap[currency]}
          </StatHelpText>
        </Stat>
      </Box>
      <Box w="50vw">
        <Text fontSize="xs" color="whiteAlpha.600">Enter the amount</Text>
        <NumberInput
          max={
            (!isCurrencyTo
              ? currentAccount.balance
              : numeral(accountFrom.balance || 0)
                  .multiply(rate)
                  .value()) || undefined
          }
          onChange={onChange}
          value={isCurrencyTo ? valueTo : valueFrom}
          autoFocus={!isCurrencyTo}
        />
      </Box>
    </Box>
  ) : null;
};

export default Currency;

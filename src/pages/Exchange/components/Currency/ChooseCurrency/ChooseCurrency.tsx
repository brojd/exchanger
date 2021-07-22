import { ChevronDownIcon } from '@chakra-ui/icons';
import Button from 'components/Button/Button';
import Menu from 'components/Menu/Menu';
import MenuButton from 'components/Menu/MenuButton';
import MenuItem from 'components/Menu/MenuItem';
import MenuList from 'components/Menu/MenuList';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { FC } from 'react';
import { selectAccountsCurrencies } from 'store/slices/accounts/selectors';
import { changeCurrencyFrom, changeCurrencyTo } from 'store/slices/exchange';
import { selectCurrencyFromAndTo } from 'store/slices/exchange/selectors';

interface ChooseCurrencyProps {
  isCurrencyTo?: boolean;
  currency: string;
}

const ChooseCurrency: FC<ChooseCurrencyProps> = ({
  isCurrencyTo,
  currency,
}) => {
  const dispatch = useAppDispatch();
  const allCurrencies = useAppSelector(selectAccountsCurrencies);
  const { currencyFrom, currencyTo } = useAppSelector(selectCurrencyFromAndTo);
  const currencyOptions = allCurrencies.filter(
    (item) =>
      item.toLowerCase() !==
      (isCurrencyTo ? currencyTo : currencyFrom).toLowerCase()
  );
  return (
    <Menu flip={false} placement="bottom-start">
      <>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          minW="33vw"
          textAlign="start"
        >
          {currency}
        </MenuButton>
        <MenuList>
          {currencyOptions.map((item) => (
            <MenuItem
              key={item}
              onClick={() =>
                dispatch(
                  (isCurrencyTo ? changeCurrencyTo : changeCurrencyFrom)(
                    item.toLocaleLowerCase()
                  )
                )
              }
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </>
    </Menu>
  );
};

export default ChooseCurrency;

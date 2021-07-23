import Button from 'components/Button/Button';
import { useAppSelector } from 'hooks/store';
import { useDispatch } from 'react-redux';
import { exchange } from 'store/shared/actions';
import {
  isExchangeButtonDisabled,
  selectExchange,
} from 'store/slices/exchange/selectors';

const ExchangeButton = () => {
  const dispatch = useDispatch();
  const exchangeParams = useAppSelector(selectExchange);
  const disabled = useAppSelector(isExchangeButtonDisabled);
  const onClick = () => {
    if (exchangeParams.valueFrom) dispatch(exchange(exchangeParams));
  };
  return (
    <Button onClick={onClick} disabled={disabled}>
      Exchange
    </Button>
  );
};

export default ExchangeButton;

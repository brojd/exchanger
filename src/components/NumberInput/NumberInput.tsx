import { FC } from 'react';
import {
  NumberInput as ChakraNumberInput,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

type NumberInputProps = ChakraNumberInputProps &
  Pick<NumberInputFieldProps, 'maxLength'>;

const NumberInput: FC<NumberInputProps> = ({ maxLength, ...props }) => (
  <ChakraNumberInput precision={2} isInvalid={false} min={0} {...props}>
    <NumberInputField maxLength={maxLength} />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </ChakraNumberInput>
);

export default NumberInput;

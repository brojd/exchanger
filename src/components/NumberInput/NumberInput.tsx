import { FC } from 'react';
import {
  NumberInput as ChakraNumberInput,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputField,
  NumberInputFieldProps,
} from '@chakra-ui/react';

type NumberInputProps = ChakraNumberInputProps &
  Pick<NumberInputFieldProps, 'maxLength' | 'autoFocus'>;

const NumberInput: FC<NumberInputProps> = ({
  maxLength,
  autoFocus,
  ...props
}) => (
  <ChakraNumberInput
    precision={2}
    isInvalid={false}
    min={0}
    size="lg"
    color="white"
    variant="unstyled"
    {...props}
  >
    <NumberInputField
      maxLength={maxLength}
      autoFocus={autoFocus}
      fontSize="4xl"
    />
  </ChakraNumberInput>
);

export default NumberInput;

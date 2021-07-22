import { FC, forwardRef } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps;

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <ChakraButton {...props} ref={ref} />
);

export default Button;

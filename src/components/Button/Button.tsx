import { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps;

const Button: FC<ButtonProps> = (props) => <ChakraButton {...props} />;

export default Button;

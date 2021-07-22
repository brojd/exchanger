import { FC } from 'react';
import {
  ButtonProps,
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react';

type MenuButtonProps = ChakraMenuButtonProps & ButtonProps;

const MenuButton: FC<MenuButtonProps> = (props) => (
  <ChakraMenuButton {...props} />
);

export default MenuButton;

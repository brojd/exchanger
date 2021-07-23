import { FC } from 'react';
import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from '@chakra-ui/react';

type MenuProps = ChakraMenuProps;

const Menu: FC<MenuProps> = (props) => <ChakraMenu {...props} />;

export default Menu;

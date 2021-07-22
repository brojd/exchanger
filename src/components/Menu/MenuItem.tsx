import { FC } from 'react';
import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react';

type MenuItemProps = ChakraMenuItemProps;

const MenuItem: FC<MenuItemProps> = (props) => <ChakraMenuItem {...props} />;

export default MenuItem;

import { FC } from 'react';
import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react';

type MenuListProps = ChakraMenuListProps;

const MenuList: FC<MenuListProps> = (props) => <ChakraMenuList {...props} />;

export default MenuList;

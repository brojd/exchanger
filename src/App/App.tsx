import { Box } from '@chakra-ui/react';
import Exchange from 'pages/Exchange/Exchange';

function App() {
  return (
    <Box
      bgGradient="linear(to-br, blue.400, teal.400)"
      minH="100vh"
      px="6"
      overflowX="hidden"
    >
      <Exchange />
    </Box>
  );
}

export default App;

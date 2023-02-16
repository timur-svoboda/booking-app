import { Container, Flex } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { AuthButtons } from '@booking-app/web/auth';

/* eslint-disable-next-line */
export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  return (
    <Box borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="100%">
        <Flex justifyContent="flex-end" pt={2} pb={2}>
          <AuthButtons />
        </Flex>
      </Container>
    </Box>
  );
}

export default AppBar;

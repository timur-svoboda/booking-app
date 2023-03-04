import { Container, Flex } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { AuthButtons } from '@booking-app/web/auth';
import { useAuth0 } from '@auth0/auth0-react';
import { AddStayPageLink, OwnStaysListPageLink } from '@booking-app/web/stays';

/* eslint-disable-next-line */
export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  const { isAuthenticated } = useAuth0();

  return (
    <Box borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="100%">
        <Flex justifyContent="flex-end" pt={2} pb={2}>
          <Box pr={2}>{isAuthenticated && <AddStayPageLink />}</Box>
          <Box pr={2}>
            {isAuthenticated && (
              <Link to="/reservations/my">
                <Button as="span" colorScheme="teal" variant="ghost">
                  My Reservations
                </Button>
              </Link>
            )}
          </Box>
          <Box pr={2}>
            {isAuthenticated && (
              <Link to="/reservations/my-stays">
                <Button as="span" colorScheme="teal" variant="ghost">
                  My Stays Reservations
                </Button>
              </Link>
            )}
          </Box>
          <Box pr={2}>{isAuthenticated && <OwnStaysListPageLink />}</Box>
          <AuthButtons />
        </Flex>
      </Container>
    </Box>
  );
}

export default AppBar;

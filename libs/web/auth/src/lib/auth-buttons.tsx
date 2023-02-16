import { useAuth0 } from '@auth0/auth0-react';
import { Box, Flex } from '@chakra-ui/react';
import LogInButton from './log-in-button';
import LogOutButton from './log-out-button';
import SignUpButton from './sign-up-button';

/* eslint-disable-next-line */
export interface AuthButtonsProps {}

export function AuthButtons(props: AuthButtonsProps) {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <LogOutButton />;
  }

  return (
    <Flex>
      <Box pr={2}>
        <SignUpButton />
      </Box>
      <LogInButton />
    </Flex>
  );
}

export default AuthButtons;

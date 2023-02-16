import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface LogInButtonProps {}

export function LogInButton(props: LogInButtonProps) {
  const { loginWithRedirect } = useAuth0();

  const onClick = () => {
    loginWithRedirect();
  };

  return (
    <Button colorScheme="teal" variant="outline" onClick={onClick}>
      Log In
    </Button>
  );
}

export default LogInButton;

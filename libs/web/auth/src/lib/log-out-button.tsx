import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface LogOutButtonProps {}

export function LogOutButton(props: LogOutButtonProps) {
  const { logout } = useAuth0();

  const onClick = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button colorScheme="teal" onClick={onClick}>
      Log Out
    </Button>
  );
}

export default LogOutButton;

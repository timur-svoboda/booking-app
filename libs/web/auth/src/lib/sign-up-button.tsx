import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface SignUpButtonProps {}

export function SignUpButton(props: SignUpButtonProps) {
  const { loginWithRedirect } = useAuth0();

  const onClick = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <Button colorScheme="teal" onClick={onClick}>
      Sign Up
    </Button>
  );
}

export default SignUpButton;

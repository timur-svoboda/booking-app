import { Button, Stack } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NavigationProps {
  onNavigate?: () => void;
}

export interface NavigationLink {
  title: string;
  url: string;
  protected?: boolean;
}

export const navigationLinks: NavigationLink[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Add Stay',
    url: '/stays/add-new',
    protected: true,
  },
  {
    title: 'My Stays',
    url: '/stays/my',
    protected: true,
  },
  {
    title: 'My Reservations',
    url: '/reservations/my',
    protected: true,
  },
  {
    title: 'My Stays Reservations',
    url: '/reservations/my-stays',
    protected: true,
  },
];

export function Navigation(props: NavigationProps) {
  const { isAuthenticated } = useAuth0();

  const allowedNavigationLinks = navigationLinks.filter((navigationLink) => {
    return (
      !navigationLink.protected || (navigationLink.protected && isAuthenticated)
    );
  });

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing="8px">
      {allowedNavigationLinks.map((navigationLink) => (
        <Link key={navigationLink.url} to={navigationLink.url}>
          <Button
            as="span"
            colorScheme="teal"
            variant="ghost"
            onClick={props.onNavigate}
          >
            {navigationLink.title}
          </Button>
        </Link>
      ))}
    </Stack>
  );
}

export default Navigation;

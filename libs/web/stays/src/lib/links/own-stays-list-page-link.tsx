import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface OwnStaysListPageLinkProps {}

export function OwnStaysListPageLink(props: OwnStaysListPageLinkProps) {
  return (
    <Link to="/stays/own">
      <Button as="span" colorScheme="teal" variant="ghost">
        Own Stays
      </Button>
    </Link>
  );
}

export default OwnStaysListPageLink;

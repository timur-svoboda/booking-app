import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface AddStayPageLinkProps {}

export function AddStayPageLink(props: AddStayPageLinkProps) {
  return (
    <Link to="stays/add-new">
      <Button as="span" colorScheme="teal" variant="ghost">
        Add Stay
      </Button>
    </Link>
  );
}

export default AddStayPageLink;

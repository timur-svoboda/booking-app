import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface EditStayPageLinkProps {
  id: string;
}

export function EditStayPageLink(props: EditStayPageLinkProps) {
  return (
    <Link to={`stays/edit/${props.id}`}>
      <Button as="span" colorScheme="teal" variant="ghost">
        Edit Stay
      </Button>
    </Link>
  );
}

export default EditStayPageLink;

import { Box, Container } from '@chakra-ui/react';
import AddStayForm from './add-stay-form';

/* eslint-disable-next-line */
export interface AddStayPageProps {}

export function AddStayPage(props: AddStayPageProps) {
  return (
    <Box pt={8} pb={8}>
      <Container maxW="600px">
        <AddStayForm />
      </Container>
    </Box>
  );
}

export default AddStayPage;

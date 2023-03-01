import { Box, Container } from '@chakra-ui/react';
import StaysList from '../stays-list/stays-list';

/* eslint-disable-next-line */
export interface StaysListPageProps {}

export function StaysListPage(props: StaysListPageProps) {
  return (
    <Box pt={8} pb={8}>
      <Container maxWidth="container.xl">
        <StaysList />
      </Container>
    </Box>
  );
}

export default StaysListPage;

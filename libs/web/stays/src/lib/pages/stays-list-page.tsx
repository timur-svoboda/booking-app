import { Box, Container } from '@chakra-ui/react';
import StaysList from '../stays-list/stays-list';

/* eslint-disable-next-line */
export interface StaysListPageProps {
  own?: boolean;
}

export function StaysListPage(props: StaysListPageProps) {
  return (
    <Box pt={8} pb={8}>
      <Container maxWidth="container.xl">
        <StaysList own={props.own} />
      </Container>
    </Box>
  );
}

export default StaysListPage;

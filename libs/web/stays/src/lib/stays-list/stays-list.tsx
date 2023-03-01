import { StayDto } from '@booking-app/shared/dtos';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { toast } from 'react-toastify';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import StayApi from '../stay-api';
import StayCard from './stay-card';

/* eslint-disable-next-line */
export interface StaysListProps {}

const limit = 5;

export function StaysList(props: StaysListProps) {
  const [stays, setStays] = React.useState<StayDto[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [skip, setSkip] = React.useState<number>(0);
  const onLoadMore = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data: newStays } = await StayApi.getMany({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      if (newStays.length === 0) {
        setHasNextPage(false);
      } else {
        setStays([...stays, ...newStays]);
        setSkip(skip + limit);
      }
    } catch (error: unknown) {
      toast.error('Unknown error. Try to reload the page');
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setHasNextPage, setStays, stays, setError, setSkip, skip]);
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    disabled: error,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!hasNextPage && stays.length === 0) {
    return (
      <Center width="100%" ref={sentryRef}>
        <Heading color="gray.500">Nothing Found</Heading>
      </Center>
    );
  }

  return (
    <Box width="100%">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
        gap={6}
      >
        {stays.map((stay) => (
          <GridItem width="100%">
            <StayCard stay={stay} />
          </GridItem>
        ))}
      </Grid>
      {(loading || hasNextPage) && (
        <Center width="100%" ref={sentryRef}>
          <Spinner />
        </Center>
      )}
    </Box>
  );
}

export default StaysList;

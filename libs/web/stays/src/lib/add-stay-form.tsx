import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import StayApi from './stay-api';
import { useAuth0 } from '@auth0/auth0-react';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

export function AddStayForm(props: AddStayFormProps) {
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const accessToken = await getAccessTokenSilently();

    await StayApi.create({ title, description }, accessToken);

    setTitle('');
    setDescription('');
  };

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading as="h1" size="lg" mb={6}>
        Add a Stay
      </Heading>

      <VStack spacing={4} mb={6}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title" // It disables Chrome Password Manager
            type="text"
            placeholder="My Awesome Hotel"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description of My Awesome Hotel"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
      </VStack>

      <Flex justifyContent="flex-end">
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default AddStayForm;

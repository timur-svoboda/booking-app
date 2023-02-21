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
  FormErrorMessage,
} from '@chakra-ui/react';
import StayApi from './stay-api';
import { useAuth0 } from '@auth0/auth0-react';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

export function AddStayForm(props: AddStayFormProps) {
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const [loading, setLoading] = React.useState<boolean>(false);
  const [titleError, setTitleError] = React.useState<string[] | null>(null);
  const [descriptionError, setDescriptionError] = React.useState<
    string[] | null
  >(null);

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const accessToken = await getAccessTokenSilently();

    setLoading(true);

    try {
      await StayApi.create({ title, description }, accessToken);

      setTitle('');
      setDescription('');

      setTitleError(null);
      setDescriptionError(null);
    } catch (error: any) {
      const { title, description } = error.response.data.message;

      if (title && title.length > 0) {
        setTitleError(title);
      } else {
        setTitleError(null);
      }

      if (description && description.length > 0) {
        setDescriptionError(description);
      } else {
        setDescriptionError(null);
      }
    }

    setLoading(false);
  };

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading as="h1" size="lg" mb={6}>
        Add a Stay
      </Heading>

      <VStack spacing={4} mb={6}>
        <FormControl isInvalid={titleError !== null} isDisabled={loading}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title" // It disables Chrome Password Manager
            type="text"
            placeholder="My Awesome Hotel"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormErrorMessage>{titleError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={descriptionError !== null} isDisabled={loading}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description of My Awesome Hotel"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormErrorMessage>{descriptionError}</FormErrorMessage>
        </FormControl>
      </VStack>

      <Flex justifyContent="flex-end">
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default AddStayForm;

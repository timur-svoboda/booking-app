import { Center, Container, Flex } from '@chakra-ui/layout';
import { Box, Button, Slide } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AuthButtons } from '@booking-app/web/auth';
import Navigation from './navigation';
import React from 'react';

/* eslint-disable-next-line */
export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = React.useState(false);

  React.useEffect(() => {
    if (isMobileMenuVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuVisible]);

  return (
    <Box padding="12px 0" borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="100%">
        <Flex justify="space-between" align="center">
          <Box display={{ base: 'none', lg: 'block' }}>
            <Navigation />
          </Box>
          <Button
            w="48px"
            h="48px"
            display={{ lg: 'none' }}
            colorScheme="teal"
            variant="ghost"
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          >
            <Center as="span">
              <HamburgerIcon w="32px" h="32px" />
            </Center>
          </Button>
          <AuthButtons />
        </Flex>
      </Container>
      <Box display={{ lg: 'none' }}>
        <Slide
          direction="left"
          in={isMobileMenuVisible}
          style={{ position: 'absolute', top: 72, zIndex: 10, height: '100vh' }}
        >
          <Box w="100%" h="100%" p="24px 16px" bg="white">
            <Navigation onNavigate={() => setIsMobileMenuVisible(false)} />
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}

export default AppBar;

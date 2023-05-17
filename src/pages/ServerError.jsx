import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function ServerErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Takes the user back to the previous page
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Server Error
      </Text>
      <Text fontSize="lg" textAlign="center" mb={4}>
        Oops! Something went wrong on our end. Please try again later.
      </Text>
      <Button colorScheme="blue" onClick={handleGoBack}>
        Go Back
      </Button>
    </Box>
  );
}

export default ServerErrorPage;

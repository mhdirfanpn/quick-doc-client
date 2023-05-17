import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate()
    const [user,setUser] = useState(false)
    const [doctor,setDoctor] = useState(false)
    const [admin,setAdmin] = useState(false)

    useEffect(()=>{
        if(window.location.href.includes('admin')) setAdmin(true)
        else if(window.location.href.includes('doctor-login')) setDoctor(true)
        else setUser(true)
    },[])
   

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      { user &&
        <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={()=>navigate('/home')}
        >
        Go to Home
      </Button>}
      { doctor &&
        <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={()=>navigate('/doctor-home')}
        >
        Go to Home
      </Button>}
      { admin &&
        <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={()=>navigate('/dashboard')}
        >
        Go to Home
      </Button>}
    </Box>
  );
}
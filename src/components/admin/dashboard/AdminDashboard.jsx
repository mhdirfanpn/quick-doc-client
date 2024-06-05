/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  Center,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaRupeeSign, FaUserNurse, FaUsers, FaElementor } from "react-icons/fa";
import LineGraph from "./LineGraph";
import { useNavigate } from "react-router-dom";
import { adminInstance } from "../../../utils/axios";
import { DASHBOARD } from "../../../utils/ConstUrls";
import { Toaster, toast } from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [total, setTotal] = useState(0);
  const [revenue, setRevenue] = useState([]);


  const dashboardData = async () => {
    try {
      const res =  await adminInstance.get(DASHBOARD)
     
        setUsers(res.data.users);
        setDoctors(res.data.doctors);
        setAppointments(res.data.appointmnets);
        setTotal(res.data.total[0]?.totalRate);
        if (res.data.revenue[0]?.revenue) {
          setRevenue(res.data.revenue);
        }
    } catch (err) {
      navigate('/error')
    } 
  };

  useEffect(() => {
    dashboardData();
  }, []);



  return (
    <Box marginLeft={24} marginTop={24} maxWidth="1400">
      <Flex>
        <Box flex={1}>
          <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
            <Flex>
              <Box w="250px" h={100} bg={"violet"} boxShadow="md">
                <Center>
                  <VStack>
                    <Text fontWeight={"extrabold"}>Users</Text>
                    <HStack>
                      <FaUsers fontSize={40} />
                      <Heading fontStyle={"italic"}>{users}</Heading>
                    </HStack>
                  </VStack>
                </Center>
              </Box>
              <Spacer />
              <Box w="250px" h={100} bg={"green.400"} boxShadow="md">
                <Center>
                  <VStack>
                    <Text fontWeight={"extrabold"}>Doctors</Text>
                    <HStack>
                      <FaUserNurse fontSize={40} />
                      <Heading fontStyle={"italic"}>{doctors}</Heading>
                    </HStack>
                  </VStack>
                </Center>
              </Box>
              <Spacer />
              <Box w="250px" h={100} bg={"#7e71bf"} boxShadow="md">
                <Center>
                  <VStack>
                    <Text fontWeight={"extrabold"}>Appointments</Text>
                    <HStack>
                      <FaElementor fontSize={40} />
                      <Heading fontStyle={"italic"}>{appointments}</Heading>
                    </HStack>
                  </VStack>
                </Center>
              </Box>
              <Spacer />
              <Box w="250px" h={100} bg={"#d98a4e"} boxShadow="md">
                <Center>
                  <VStack>
                    <Text fontWeight={"extrabold"}>Revenue</Text>
                    <HStack>
                      <FaRupeeSign fontSize={40} />
                      <Heading fontStyle={"italic"}>{total}</Heading>
                    </HStack>
                  </VStack>
                </Center>
              </Box>
            </Flex>
            <Flex mt={50}>
              <Spacer />
              <Box w="100%">
                <Center>
                  <LineGraph w="100%" revenue={revenue} />
                </Center>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Toaster />
    </Box>
   
  );
};

export default AdminDashboard;

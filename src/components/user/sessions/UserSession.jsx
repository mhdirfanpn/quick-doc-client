import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LIMIT = 8;

const UserSession = () => {
  const token = localStorage.getItem("userToken");
  const userData = jwtDecode(token);
  const [session, setSession] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalSession, setTotalSessions] = useState(0);
  const [state, setState] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    getSessionDetails();
    // eslint-disable-next-line
  }, [activePage, state]);

  const getSessionDetails = async () => {
    try {
      const response = await axios.get(`/getSession/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: activePage,
          size: LIMIT,
        },
      });
      setSession(response.data.session);
      setTotalSessions(response.data.total);
    } catch (err) {
      navigate('/error')
    }
  };

  const cancelSession = async (sessionID, doctorID, appDate, appTime) => {
    axios
      .put(
        "/cancelSession",
        {
          sessionID,
          doctorID,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        cancelAppointment(doctorID, appDate, appTime);
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  const cancelAppointment = async (doctorID, appDate, appTime) => {
    axios
      .put(
        "/cancelAppointment",
        {
          doctorID,
          appDate,
          appTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setState(response);
      })
      .catch((err) => {
        navigate('/error')
      });
  };

  return (
    <Box w="70%" margin="0 auto" minH="100vh" mt={24}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Doctor</Th>
              <Th>Booked Date</Th>
              <Th>Session Date</Th>
              <Th>Session Time</Th>
              <Th>Cancel Appointment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {session.map((session, index) => {
              const dateStr = session.sessionDate;
              const date = new Date(dateStr);
              date.setDate(date.getDate() - 1);
              const newDateStr = date.toISOString();
              const isBeforeDate = new Date() < new Date(newDateStr);

              return (
                <Tr key={index}>
                  <Td>Dr. {session.doctorName}</Td>
                  <Td>{session.bookedDate}</Td>
                  <Td>{session.sessionDate}</Td>
                  <Td>{session.timeSlot}</Td>
                  <Td>
                    {isBeforeDate ? (
                      <Button
                        color="red.300"
                        onClick={() =>
                          cancelSession(
                            session._id,
                            session.doctorId,
                            session.sessionDate,
                            session.timeSlot
                          )
                        }
                      >
                        cancel
                      </Button>
                    ) : (
                      <Button color="red.300" isDisabled>
                        cancel
                      </Button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        className="parent-element"
        display="flex"
        justifyContent="flex-end"
        marginRight="150"
      >
        <ButtonGroup mt={10}>
          <Button
            onClick={() => setActivePage(activePage - 1)}
            variant="outline"
            isDisabled={activePage === 1}
          >
            Previous Page
          </Button>

          <Button
            onClick={() => setActivePage(activePage + 1)}
            ml="-px"
            isDisabled={activePage === Math.ceil(totalSession / LIMIT)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default UserSession;

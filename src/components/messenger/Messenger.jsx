import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import Chat from "../chat/Chat";
import axios from "../../utils/axios";
import { io } from "socket.io-client";
import Conversations from "../conversations/Conversations";
import ActiveSession from "../activeSession/ActiveSession";
import ChatAvatar from "../chatAvatar/ChatAvatar"

function Messenger({ isUser }) {


  let commonUser;
  const doctorToken = useSelector((state) => state.doctor.doctorToken);
  if (doctorToken) {
    commonUser = jwtDecode(doctorToken);
  }

  const userToken = useSelector((state) => state.user.userToken);
  if (userToken) {
    commonUser = jwtDecode(userToken);
  }



  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [active, setActive] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();


  useEffect(() => {
    socket.current = io("wss://api.quickdoc.online");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);



  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, active]);

  useEffect(() => {
    socket.current.emit("addUser", commonUser.id);
    socket.current.on("getUsers", (users) => {});
  }, [commonUser, active]);



  useEffect(() => {
    const getConversation = async () => {
      try {
        await axios.get("/conversation/" + commonUser.id).then((res) => {
          setConversations(res.data);
        });
      } catch (error) {}
    };
    getConversation();
  }, [commonUser.id, active]);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, active]);



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, active]);



  const handleSubmit = async (e) => {
    
    const message = {
      sender: commonUser.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find(
      (member) => member !== commonUser.id
    );

    socket.current.emit("sendMessage", {
      senderId: commonUser.id,
      recieverId: recieverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };



  const handleActiveSessionId = async (id) => {
    const body = {
      senderId: commonUser.id,
      receiverId: id,
    };
    try {
      const conversation = await axios.post("/conversation", body);
      setActiveConversation(conversation.data);
      console.log(conversation);
    } catch (err) {
      console.log(err);
    }
  };



  const handleActive = (e) => {
    e.preventDefault();
    setActive(e);
  };

  if(messages[0]?.conversationId === activeConversation?._id){
    console.log("first")
  }
  

  
  return (
    <Flex direction="row" mt={isUser ? 0 : 0}>
      <Box
        w="20%"
        h={isUser ? "100vh" : "100vh"}
        borderRight="1px solid gray.200"
        p="4"
        mt={4}
      >
        <InputGroup mb="4">
          <InputLeftElement pointerEvents="none" border={"none"} />
          <Input
            w={1}
            placeholder=""
            borderColor={"transparent"}
            _hover={{ borderColor: "transparent" }}
            _focus={{ borderColor: "transparent" }}
          />
        </InputGroup>

        <Box overflowY="auto" h="calc(100vh - 120px)" mt={9}>
          {conversations.map((c) => {
            return (
              <Box onClick={() => setCurrentChat(c)}>
                {doctorToken ? (
                  <Conversations
                    key={c._id}
                    conversation={c}
                    currentUser={commonUser.id}
                    isDoctor={true}
                  />
                ) : (
                  <Conversations
                    key={c._id}
                    conversation={c}
                    currentUser={commonUser.id}
                    isDoctor={false}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box w="53%" h="100vh">
      {currentChat && (
      <ChatAvatar isDoctor={doctorToken}  currentUserId={commonUser.id} />
      )}
        {currentChat ? (
          <>
            <Box
              overflowY="auto"
              h="calc(90vh - 200px)"
              mt="24"
              css={{ "::-webkit-scrollbar": { display: "none" } }}
            >
              <Box>
                {messages.map((m) => (
                  <Box ref={scrollRef} key={m._id}>
                    <Chat message={m} own={m.sender === commonUser.id} />
                  </Box>
                ))}
              </Box>
            </Box>

            { (messages[0]?.conversationId === activeConversation?._id || !messages[0]) && (
              <Box mt="4" mb={12}>
                <Textarea
                  placeholder="Type your message..."
                  mb="4"
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e)=>{
                    e.key==='Enter' &&
                    handleSubmit()
                  }}
                  value={newMessage}
                />
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Send
                </Button>
              </Box>
             )}
          </>
        ) : (
          <Text
            className="noConversation"
            mt="10%"
            fontSize="50px"
            color="gray.300"
            cursor="default"
            textAlign="center"
          >
            Open a conversation to start chat
          </Text>
        )}
      </Box>
      <Box
        w="20%"
        h={isUser ? "100vh" : "100vh"}
        borderRight="1px solid gray.200"
        p="4"
        mt={4}
      >
        <InputGroup mb="4" ml={24}>
          <InputLeftElement pointerEvents="none" border={"none"} />
          <Input
            w={1}
            placeholder=""
            borderColor={"transparent"}
            _hover={{ borderColor: "transparent" }}
            _focus={{ borderColor: "transparent" }}
          />
        </InputGroup>

        <Box mt={9}>
          <Box onClick={handleActive}>
            {doctorToken ? (
              <ActiveSession
                currentUser={commonUser.id}
                isDoctor={true}
                handleActiveSessionId={handleActiveSessionId}
              />
            ) : (
              <ActiveSession
                currentUser={commonUser.id}
                isDoctor={false}
                handleActiveSessionId={handleActiveSessionId}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Messenger;

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Message from "./components/Message";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "./firbase.js";

const auth = getAuth(app);
const db = getFirestore(app);

const logoutHandler = () => {
  signOut(auth);
};

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const unsubscribeMessages = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  return (
    <>
      <Box bg={"red.50"} h="100vh" p={4}>
        {user ? (
          <Container bg={"white"} h={"full"} maxW="container.md" p={7}>
            <Heading as="h1" size="lg" textAlign="center">
              CHATTU
            </Heading>
            <VStack h="full" spacing={4}>
              <Button onClick={logoutHandler} colorScheme={"orange"} w={"full"}>
                Logout
              </Button>

              <VStack
                h="full"
                w={"full"}
                overflowY={"auto"}
                css={{ "&::-webkit-scrollbar": { display: "none" } }}
              >
                {messages.map((item) => (
                  <Message
                    key={item.id}
                    user={item.uid === user.uid ? "me" : "other"}
                    text={item.text}
                    uri={item.uri}
                  />
                ))}
                <div ref={divForScroll}></div>
              </VStack>

              <form onSubmit={submitHandler} style={{ width: "100%" }}>
                <HStack>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a message..."
                  />
                  <Button colorScheme={"purple"} type="submit">
                    Send
                  </Button>
                </HStack>
              </form>
            </VStack>
          </Container>
        ) : (
          <VStack
            bg="white"
            alignItems={"center"}
            justifyContent={"center"}
            h="full"
          >
            <Button onClick={loginHandler} colorScheme="blue">
              Sign In With Google
            </Button>
          </VStack>
        )}
      </Box>
    </>
  );
}

export default App;

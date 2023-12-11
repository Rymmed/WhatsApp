import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import bg from "../../assets/images/BG.png";
import Message from "../components/Message";
import InputBox from "../components/InputBox";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import firebase from "../../config";

const database = firebase.database();

const ChatScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const { currentid } = route.params;
  const contactId = route.params.contactId;
  
  
  useEffect(() => {

    const messagesRef = database.ref("messages");

    messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      const messagesArray = Object.values(messagesData || {});

      const filteredMessages = messagesArray.filter(
        (message) =>
          (message.senderId === currentid &&
            message.receiverId === contactId) ||
          (message.senderId === contactId &&
            message.receiverId === currentid)
      );

      setMessages(filteredMessages);
      console.log(filteredMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => messagesRef.off();
  }, [currentid, contactId]);

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      keyboardVerticalOffset={Platform.OS === "android" ? 90 : 60}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} currentid= {currentid} />}
          style={styles.list}
          inverted
        />
        <InputBox senderId={currentid} receiverId={contactId} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
export default ChatScreen;

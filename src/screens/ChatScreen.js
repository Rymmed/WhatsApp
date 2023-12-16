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
import { useEffect, useState } from "react";
import firebase from "../../config";

const database = firebase.database();

const ChatScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const { currentid,contactId } = route.params;
  // const contactId = route.params.contactId;
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const messagesRef = database.ref("messages");

    const handleTypingStatus = (snapshot) => {
      const typingStatus = snapshot.val();
      setIsTyping(typingStatus);
    };

    messagesRef
      .child(contactId)
      .child("typing")
      .on("value", handleTypingStatus);

    messagesRef.on(
      "value",
      (snapshot) => {
        const messagesData = snapshot.val();
        const messagesArray = Object.values(messagesData || {});

        const sortedMessages = messagesArray.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        const filteredMessages = sortedMessages.filter(
          (message) =>
            (message.senderId === currentid &&
              message.receiverId === contactId) ||
            (message.senderId === contactId && message.receiverId === currentid)
        );

        setMessages(filteredMessages);

      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );

    return () => {
      messagesRef.off();
      messagesRef.child(contactId).child('typing').off();
    };
  }, [currentid, contactId]);

  const handleTyping = () => {
    // Update typing status in Firebase when the sender starts typing
    database.ref('messages').child(currentid).child('typing').set(true);

    // Set a timeout to stop typing after a certain period (e.g., 2 seconds)
    setTimeout(() => {
      database.ref('messages').child(currentid).child('typing').set(false);
    }, 6000);
  };

  const renderTypingIndicator = () => {
    if (isTyping) {
      return <Text style={styles.typingIndicator}>{`typing...`}</Text>;
    }
    return null;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      keyboardVerticalOffset={Platform.OS === "android" ? 90 : 60}
      style={styles.bg}
      
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Message message={item} currentid={currentid} />
          )}
          style={styles.list}
          inverted
        />
        {renderTypingIndicator()}
        <InputBox senderId={currentid} receiverId={contactId} isTyping={isTyping} onTyping={handleTyping} />
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
  typingIndicator: {
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'left',
    marginVertical: 5,
    marginLeft: 5,
  },
});
export default ChatScreen;

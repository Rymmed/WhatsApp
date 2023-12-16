import { View, Text, StyleSheet, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import firebase from "../../../config";



const database = firebase.database();
const InputBox = ({senderId, receiverId, isTyping, onTyping}) => {
  //state data
  const route = useRoute();
  const [newMessage, setNewMessage] = useState("");

  const onSend = async () => {
    const messagesRef =database.ref("messages");
    const timestamp = Date.now();
    
    const newMessageObject = {
      text: newMessage,
      timestamp: timestamp,
      senderId,
      receiverId,
    };
    
    messagesRef.push(newMessageObject);
    
    setNewMessage("");
  };


  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={24} color="royalblue" />
      {/* Text Input */}
      <TextInput
        value={newMessage}
        onChangeText={(text) => {
          setNewMessage(text);
          onTyping(); 
        }}
        style={styles.input}
        placeholder="type your message..."
      />
      {/* Icon */}
      <MaterialIcons
        onPress={onSend}
        style={styles.send}
        name="send"
        size={24}
        color="white"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
  },
});

export default InputBox;

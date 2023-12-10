import { View, Text, StyleSheet, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const InputBox = () => {
  //state data

  const [newMessage, setNewMessage] = useState("Hello!");

  const onSend = () => {
    console.warn("Sending a new message", newMessage);

    setNewMessage('');
  };
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={24} color="royalblue" />
      {/* Text Input */}
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
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

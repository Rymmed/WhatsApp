import { View, Text, StyleSheet } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Message = ({ message, currentid }) => {
  const isMyMessage = () => {
    return message.senderId == currentid;
  };
  

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).format('DD/MM/YYYY HH:mm a')}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxwidth: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
});

export default Message;

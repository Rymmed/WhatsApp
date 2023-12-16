import { View, Text, FlatList } from "react-native";
import ChatListItem from "../components/ChatListItem";
import firebase from "../../config";
import { useState, useEffect } from "react";

const database = firebase.database();

const ChatsScreen = ({ route }) => {
  const { currentid } = route.params;
  const ref_users = database.ref("users");
  const ref_messages = database.ref("messages");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await ref_users.once("value");
        const usersData = Object.values(usersSnapshot.val() || []).filter(
          (user) => user.id !== currentid
        );

        const promises = usersData.map(async (user) => {
          const messagesSnapshot = await ref_messages
            .orderByChild("timestamp")
            .once("value");

          if (!messagesSnapshot.exists()) {
            return {
              ...user,
              lastMessage: null,
            };
          }

          const messagesData = messagesSnapshot.val();

          const userMessages = Object.values(messagesData || {}).filter(
            (message) =>
              (message.senderId === currentid &&
                message.receiverId === user.id) ||
              (message.senderId === user.id && message.receiverId === currentid)
          );

          // Sort messages by timestamp to get the most recent one
          const sortedMessages = userMessages.sort(
            (a, b) => b.timestamp - a.timestamp
          );

          const lastMessage =
            sortedMessages.length > 0 ? sortedMessages[0] : null;

          return {
            ...user,
            lastMessage,
          };
        });

        const usersWithLastMessages = await Promise.all(promises);
        const filteredUsers = usersWithLastMessages.filter(
          (user) => user.lastMessage !== null
        );

        setData(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleNewMessage = () => {
      fetchData(); // Update data when a new message is added
    };

    fetchData();

    // Listen for changes in messages
    ref_messages.on("child_changed", handleNewMessage);
    ref_messages.on("child_added", handleNewMessage);

    return () => {
      ref_users.off();
      ref_messages.off("child_changed", handleNewMessage);
      ref_messages.off("child_added", handleNewMessage);
    };
  }, [currentid]);

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No conversations</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ChatListItem
          currentid={currentid}
          user={item}
          lastMessage={item.lastMessage}
        />
      )}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;

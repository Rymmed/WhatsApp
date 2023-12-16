import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useRoute } from "@react-navigation/native";

const ChatListItem = ({ user,lastMessage }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentid } = route.params;
  return (
    
    <Pressable
    onPress={() =>
      navigation.navigate("Chat", {
        currentid,
        contactId: user.id,
        contactName: `${user.firstName} ${user.lastName}`,
      })
    }
      style={styles.container}
    >
      <Image
        source={{
          uri: user.url,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName}
          </Text>
          {lastMessage && (
          <Text style={styles.subTitle}>
            {dayjs(lastMessage.timestamp).fromNow(true)}
          </Text>
        )}
        </View>

        {lastMessage && (
          <Text numberOfLines={2} style={styles.subTitle}>
            {lastMessage.text}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,

    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "Lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "grey",
  },
});

export default ChatListItem;

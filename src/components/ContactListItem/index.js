import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {}}
      style={styles.container}
    >
      <Image
        source={{
          uri: user.image,
        }}
        style={styles.image}
      />

      <Text style={styles.name} numberOfLines={1}>
        {user.name}
      </Text>
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
  name: {
    flex: 1,
    fontWeight: "bold",
  },
});

export default ContactListItem;

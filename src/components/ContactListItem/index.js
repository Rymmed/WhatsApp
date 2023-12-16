import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button, Dialog, Portal } from "react-native-paper";
dayjs.extend(relativeTime);
import firebase from "../../../config";

const database = firebase.database();

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentid } = route.params;
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Phone call not supported: ${phoneNumber}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error(`Error opening phone call: ${err}`));
  };

  return (
    <Pressable onPress={showDialog} style={styles.container}>
      <Image source={{ uri: user.url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Contact Options</Dialog.Title>
          <Dialog.Content>
            <Text>What would you like to do with {user.firstName}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() =>
                navigation.navigate("Chat", {
                  currentid,
                  contactId: user.id,
                  contactName: `${user.firstName} ${user.lastName}`,
                })
              }
            >
              Send Message
            </Button>
            <Button onPress={() => handleCall(user.phone)}>Call</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ContactListItem;

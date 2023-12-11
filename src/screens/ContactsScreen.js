
import { View, Text, FlatList } from "react-native";
import chats from "../../assets/data/chats.json";
import ContactListItem from "../components/ContactListItem";
import firebase from "../../config";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from 'react-native-paper';

const database = firebase.database();

const ContactsScreen = ({route}) => {
  const { currentid } = route.params;
  const ref_users = database.ref("users");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      ref_users.on("value", (snapshot) => {
        var usersData = [];
        snapshot.forEach((user) => {
          const userData = user.val();
          if (userData.id === currentid) {
          } else usersData.push(userData);
        });
        setData(usersData);
      });
    };

    fetchData();

    return () => {
      ref_users.off();
    };
  }, [currentid]);
  return (
    <PaperProvider>
      <FlatList
        data={data}
        renderItem={({ item }) => <ContactListItem currentid={currentid} user={item} />}
        style={{ backgroundColor: 'white' }}
      />
    </PaperProvider>
    )
}

export default ContactsScreen
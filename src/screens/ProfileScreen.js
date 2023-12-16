import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import firebase from "../../config";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Card, TextInput } from "react-native-paper";

const database = firebase.database();
const auth = firebase.auth();

const ProfileScreen = () => {
  const user = auth.currentUser;
  const currentid = user.uid;
  const email = user.email;
  const [lastName, setLastName] = useState('');
  const [Isdefault, setIsdefault] = useState(true);
  const [urlImage, setUrlImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleLastNameChange = (text) => {
    setLastName(text);
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };
  const handleStatusChange = (text) => {
    setStatus(text);
  };

  const saveUserData = async () => {
    const url = await uploadLocalImageToStorage(urlImage, currentid);
    const ref_users = database.ref("users");

    const ref_user = ref_users.child("user" + currentid);
    ref_user.set({
      id: currentid,
      lastName: lastName,
      firstName: firstName,
      phone: phone,
      status: status,
      url: url,
      email: email,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setIsdefault(false);
      setUrlImage(result.assets[0].uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadLocalImageToStorage = async (uriLocal, currentid) => {
    //convertir image to blob
    const blob = await imageToBlob(uriLocal);
    const fileExtension = uriLocal.split('.').pop();
    //upload blob to firebase
    const storage = firebase.storage();
    const ref_lesimages = storage.ref("lesimages");
    const ref_une_image = ref_lesimages.child("image" + currentid + "." + fileExtension);
    await ref_une_image.put(blob);
    //recuperer url
    const url = ref_une_image.getDownloadURL();
    return url;
  };

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis la base de données Firebase
    const ref_user = database.ref(`users/user${currentid}`);
    ref_user.on("value", (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setUrlImage(userData.url || '');
        setPhone(userData.phone || '');
        setStatus(userData.status || '');
        setIsdefault(false);
      }
    });

    return () => {
      ref_user.off("value");
    };
  }, [currentid]);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={async () => await pickImage()}>
        <Image
          source={Isdefault ? require("../../assets/user.jpg") : { uri: urlImage }}
          style={styles.userPhoto}
        />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>First Name</Text>
          <TextInput  value={firstName} onChangeText={handleFirstNameChange} style={styles.input} />
          <Text style={styles.cardTitle}>Last Name</Text>
          <TextInput value={lastName} onChangeText={handleLastNameChange} style={styles.input} />
          <Text style={styles.cardTitle}>Phone Number</Text>
          <TextInput value={phone} onChangeText={handlePhoneChange} style={styles.input} />
          <Text style={styles.cardTitle}>Status</Text>
          <TextInput value={status} onChangeText={handleStatusChange} style={styles.input} />
        </Card.Content>
      </Card>

      <Button
        style={styles.saveButton}
        labelStyle={styles.buttonLabel}
        onPress={async () => await saveUserData().then((res) => alert('User added'))}
      >
        Save
      </Button>
    </ScrollView>
  );
};


export default ProfileScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      },
      userPhoto: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      card: {
        width: "80%",
        marginBottom: 20,
        elevation: 4,
      },
      cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        alignSelf: "center",
      },
      input: {
        height: 40,
        marginBottom: 10,
      },
      saveButton: {
        width: "50%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: 'center',
      },
      buttonLabel: {
        fontSize: 16,
      },
  });
  
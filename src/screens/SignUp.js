import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native';
import { useState, useRef } from 'react';
import firebase from '../../config';
import green from '../../assets/images/green3.png'

const auth = firebase.auth(); 

export default function SignUp(props) {
  
  const [email, setmail]= useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setPassword2] = useState("");
  const refInput2 = useRef();

  return (
    <ImageBackground source={green} style={styles.container}>
      <View style={{
        backgroundColor: '#0005',
        width: "85%",
        height: "auto",
        borderRadius: 5,
        }}
      >
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
            onChangeText={(text)=> {setmail(text)}}
            onSubmitEditing={()=>{refInput2.current.focus();}}
            blurOnSubmit={false}
            style={styles.inputBox}
            placeholder={'Login'}
            keyboardType={'default'}
          />
      <TextInput
        ref={refInput2}
        onChangeText={(text)=>{setPassword(text)}}
        style={styles.inputBox}
        placeholder={'password'}
        keyboardType={'default'}
        secureTextEntry={true}
      />
      <TextInput
        ref={refInput2}
        onChangeText={(text)=>{setPassword2(text)}}
        style={styles.inputBox}
        placeholder={'confirm password'}
        keyboardType={'default'}
        secureTextEntry={true}
      />
      <Button
        onPress={() => {
            if(password ===confirmpassword){
                auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(()=>{
                        props.navigation.navigate("auth")
                    })
                    .catch((err)=>{
                        alert(err);
                    });
            } else {
                alert("password inalide")
            }
        }}
        title='Submit'
        ></Button>
        <Button
        onPress={() => {
            props.navigation.goBack();
        }}
        title='Cancel'
        ></Button>

      <TouchableOpacity style={{width:"100%", alignItems: "flex-end", marginBottom:17, paddingRight:10}}>
        <Text 
          onPress={()=> alert ("create")}
          style={{color: "white"}}>
          Create new user
        </Text>
      </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    margin:17 ,
    height: 40,
    width: "90%",
    marginVertical: 24,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#dddddd",
    borderWidth: 2,
    color: "white",
    textAlign: "center"
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    
  },

});
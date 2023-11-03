import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { useState } from "react";
// import { authService } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from '@firebase/auth'
import { FIREBASE_AUTH } from "../../../firebaseConfig";



const Signin= ({navigation}) =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newAccount, setNewAccount] = useState();
  const auth = FIREBASE_AUTH;
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const SignUp = () => {
  
    if (newAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: displayName,
          });
        })
        .catch((error) => alert(error.message));
      setEmail("");
      setPassword("");
      setDisplayName("");
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)
      );
      console.log(auth);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.BaseContainer}>
      
   <Text style={styles.Title}>시니어잡</Text>
 
    <View style={styles.BorderContainer}>
      {/* <Button title="로그인" onPress={() => navigation.navigate('Root')} /> */}
      <Text style={{fontSize:25, fontWeight:'bold'}}>로그인</Text>
      <View style={styles.line}></View>
      <View style={styles.Row}>
      <View style={styles.inputWrapper}>
          {newAccount ? (
            <TextInput
              placeholder="User NickName"
              style={styles.input}
              autoCapitalize="none"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              autoCorrect={false}
            />
          ) : null}
          <TextInput
            placeholder="이메일"
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType="password"
            placeholder="비밀번호"
            style={styles.input}
          />
        </View>
       
        <View style={styles.tabview}>
          <TouchableOpacity style={styles.tab} onPress={SignUp}>
            <Text style={styles.tabText}>
              {newAccount ? "회원가입" : "로그인"}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Google</Text>
          </TouchableOpacity> */}
        </View>
        </View>
        <View>
          <TouchableOpacity style={styles.tab2} onPress={toggleAccount}>
            <Text style={styles.tabText2}>
              {newAccount ? "로그인 하시겠습니까?" : "회원가입"}
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  </SafeAreaView>

  );
};

export default Signin;


const styles = StyleSheet.create({
  BaseContainer: {
    backgroundColor: "#rgb(6, 125, 119)",
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    // position: 'absolute',
  },
  BorderContainer: {
    backgroundColor: "white",
    borderRadius:25,
    alignItems: 'center',
    marginTop : 100,
    width: 300,
    height: 400,
    padding: 20,
  },
  line:{
    backgroundColor: "black",
    width: 300,
    height: 2,
    marginTop: 5,
  },
  Row:{
    // backgroundColor: "pink",
    width: 370,
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  Title:{
    color: 'white',
    fontSize : 30,
    fontWeight : '800',
    marginTop : 40,
    marginRight : 200, 
  },
  inputWrapper:{
    // backgroundColor: "skyblue",
    alignItems: 'center',
    justifyContent: 'center',
    width:300,
    height:100,
    marginTop: 30
  },
  input: {
    // backgroundColor: "yellow",
    // borderBlockEndColor: "darkgray",
    borderColor: "black",
    borderWidth :  0.5,
    width:200,
    height:30,
    margin:5,
  },
  tab: {
    backgroundColor: "#0F4F4C",
    borderRadius: 3,
    width:50,
    height:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab2: {
    // backgroundColor: "orange",
    alignItems: 'center',
    width:200,
    height:50
  },
  tabText: {
    color: "white",
    alignItems: 'center',
    justifyContent: 'center',
    height:18,
    width:40,
    marginTop:2,
    fontSize: 15,
    fontWeight: 'bold'
  },
  tabText2: {
    // width:200,
    height:50
  },
  tabview: {
    // backgroundColor: "pink",
    alignItems: 'center',
    width:200,
    height:50,
    marginTop: 10
  }
});
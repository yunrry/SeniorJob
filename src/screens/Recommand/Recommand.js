import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { FIREBASE_DB, FIREBASE_DB2, FIREBASE_AUTH } from '../../../firebaseConfig';
import { ref as sRef, get, set } from 'firebase/database';

const Recommand = ({navigation}) => {

    return (
    <SafeAreaView>
      <View style={styles.BorderContainer}>
        <Text>안녕하세요!</Text>
      </View>
 
    </SafeAreaView>
    );
  };




const styles = StyleSheet.create({
  BaseContainer: {
    // backgroundColor: "#rgb(6, 125, 119)",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    // position: 'absolute',
  },
  BorderContainer: {
    // backgroundColor: "#rgba(6, 125, 119, 0.14)",
    width: 365,
    height : 545,
    // borderRadius:25,
    // alignItems: 'center',
    marginTop : 5,
    marginLeft : 5,
    padding: 27,
    paddingBottom: 50
  },

  Row:{
    // backgroundColor: "pink",
    width: 340,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
 
  },
  Title:{
    color: 'white',
    fontSize : 30,
    fontWeight : '800',
    marginTop : 26,
    marginLeft : 20, 
  },
  ConText:{
    // 가까운 일자리 //인기많은
    fontSize: 18,
    fontWeight: '800',
    // letterSpacing: 0.90,
    // wordWrap: 'break-word',
    color: 'black',
   
  },
  WrapText:{
    // backgroundColor: "pink",
    width: 340,
    height: 28,
    marginTop: 25,
    justifyContent:'flex-start'
  }
  
});


export default Recommand;
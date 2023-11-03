import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import DataList from "utils/Firebase/DataList";
import { FIREBASE_DB } from '../../firebaseConfig';
import { ref as sRef, get } from 'firebase/database';
import { useNavigation } from "@react-navigation/native"; // Import your navigation hook

function RBox({ rounded, size, color }) {


  const navigation = useNavigation(); // Access navigation from the hook

  const handlePress = () => {
    // Navigate to the desired screen when the box is pressed
    navigation.navigate("RecommandScreen", { /* Optional parameters */ });
  };


  const [data, setData] = useState([]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
    <View style={styles.box}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15 }}>내게 맞는 일자리 찾기</Text> 
      </View>
      </TouchableWithoutFeedback>


  );
}

RBox.defaultProps = { size: "medium", color: "black" };

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#rgba(6, 125, 119, 0.14)",
    borderRadius: 16,
    width: 320,
    height: 130,
    // marginTop: 10,
    padding: 5,
  },
});



export default RBox;
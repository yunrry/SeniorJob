import React, { Component, useState, useEffect } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, ScrollView, } from "react-native";
import Box from "components/Box";
import RBox from "components/RBox";
import { ref as sRef, get } from 'firebase/database';
import { FIREBASE_DB2, FIREBASE_AUTH } from '../../../firebaseConfig';

const Mypage = ({navigation}) => {
  // const [bookmarks, setBookmarks] = useState([]); // State to store user's bookmarks
  const bookmarksRead = []; 
  const [bookmarks, setBookmarks] = useState([]); // State to store user's bookmarks
  const [applied, setApplied] = useState([]);
  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const uid = user.uid;
      const bookmarksRef = sRef(FIREBASE_DB2, `users/${uid}/bookmarks`);
      const appliedRef = sRef(FIREBASE_DB2, `users/${uid}/appliedJobs`);
      // Fetch the user's bookmarks from Firebase Realtime Database
      get(bookmarksRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const bookmarksData = snapshot.val();
            const bookmarkedJobIds = Object.keys(bookmarksData);
            setBookmarks(bookmarkedJobIds);
            console.log(bookmarks);
          }
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
        });

        get(appliedRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const appliedData = snapshot.val();
            const appliedJobIds = Object.values(appliedData);
            setApplied(appliedJobIds);
            console.log(applied);
          }
        })
        .catch((error) => {
          console.error('Error fetching applied:', error);
        });
    }
  }, []);
  
 

  const [visible, setVisible] = useState(true);
  const onPress = () => {
    setVisible(!visible);
  };

  return (

    <SafeAreaView style={styles.BaseContainer}>
      {/* <MyBookmarks onBookmarksUpdate={handleBookmarkJobIdArrayUpdate} /> */}
      <Text style={styles.Title}>마이페이지</Text>
      
      <ScrollView style={styles.BorderContainer}>

      <View style={styles.WrapText}>
         <Text style={styles.ConText}>찜한 일자리</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.Row}>
         {bookmarks.map((jobId) => (
            <Box
              key={jobId}
              rounded={true}
              size="medium"
              color="#rgba(6, 125, 119, 0.14)"
              jobId={jobId}
            ></Box>
            ))}
        </View>
      </ScrollView>
      <View style={styles.WrapText}>
         <Text style={styles.ConText}>신청한 일자리</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.Row}>
         {applied.map((jobId) => (
            <Box
              key={jobId}
              rounded={true}
              size="medium"
              color="#rgba(6, 125, 119, 0.14)"
              jobId={jobId}
            ></Box>
            ))}
        </View>
      </ScrollView>
      {/* <View style={styles.Row}>
      <Box rounded={true} size="medium" color="#rgba(6, 125, 119, 0.14)" jobId="K120032308250023" ></Box>
            <Box rounded={true} size="medium" color="#rgba(6, 125, 119, 0.14)" jobId="K120032308250023" ></Box>
            <Box rounded={true} size="medium" color="#rgba(6, 125, 119, 0.14)" jobId="K120032308250023" ></Box>
      </View> */}
      <View style={styles.WrapText}>
         <Text style={styles.ConText}>내 정보</Text>
      </View>
      <View style={styles.WrapText}>
         <Text style={styles.ConText}>질문하기</Text>
      </View>
      
      <View style={styles.WrapText}>
  
      </View>
      <RBox />

      <View style={styles.Row}></View>
      </ScrollView>
      
    </SafeAreaView>
);
};





const styles = StyleSheet.create({
  BaseContainer: {
    backgroundColor: "#rgb(6, 125, 119)",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    // position: 'absolute',
  },
  BorderContainer: {
    backgroundColor: "white",
    height : 700,
    borderTopEndRadius:25,
    borderTopStartRadius:25,
    // alignItems: 'center',
    marginTop : 20,
    marginLeft : 12,
    width: 350,
    height: 580,
    padding: 15,
    paddingLeft: 20,
    paddingBottom: 50
  },

  Row:{
    // backgroundColor: "pink",
    width: 1000,
    height: 115,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
 
  },
  Title:{
    color: 'white',
    fontSize : 28,
    fontWeight : '800',
    marginTop : 20,
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
    marginTop: 16,
    justifyContent:'flex-start'
  }
  
});

export default Mypage;
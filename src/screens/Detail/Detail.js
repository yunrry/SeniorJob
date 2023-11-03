import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { FIREBASE_DB, FIREBASE_DB2, FIREBASE_AUTH } from '../../../firebaseConfig';
import { ref as sRef, get, set } from 'firebase/database';

const Detail = ({ route }) => {
  const { jobId, recrtTitle, data } = route.params;
  const [isApplied, setIsApplied] = useState(false);
  const [userAppliedJobs, setUserAppliedJobs] = useState([]);

  async function updateAppliedJobs(jobId) {
    
    const user = FIREBASE_AUTH.currentUser;
    
    if (user) {
      const uid = user.uid;
      const userRef = sRef(FIREBASE_DB2, `users/${uid}`);
  
      try {
        const snapshot = await get(userRef);
  
        if (!snapshot.exists()) {
          // If the data does not exist, create the 'applied' node
          await set(userRef, {});
        }
  
        const userData = snapshot.val();
        const appliedJobs = userData.appliedJobs || [];
        appliedJobs.push(jobId);
        userData.appliedJobs = appliedJobs;
  
        // Update the user's data in Firebase Realtime Database
        await set(userRef, userData);
      } catch (error) {
        console.error('Error updating applied jobs:', error);
      }
    }
  }
  

  const handleApply = () => {
    if (!isApplied) {
      setIsApplied(true);
      updateAppliedJobs(jobId);
    }
  };


    return (
    <SafeAreaView>
      <View style={styles.BorderContainer}>
        <Text style={{ fontSize: 10, fontWeight: 'light', marginTop: 10}}> id: {jobId}</Text>
        <Text style={{ fontSize: 23, fontWeight: 'bold', color:"#0F4F4C", marginTop: 10 , marginBottom: 15}} >{data.recrtTitle}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 260 }}> {data.deadline}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> 나이 : {data.age} 이상</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> 주소 : {data.plDetAddr}</Text>
        {data.plbizNm && (
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> 사업장 : {data.plbizNm}</Text>
          )}
         {data.clerkContt && (
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> 연락처 : {data.clerkContt}</Text>
          )}
         {data.homepage && (
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> 홈페이지 : {data.homepage}</Text>
          )}
        {/* 여기에서 data를 출력할 수 있습니다. */}

        {data.deadline === "마감" ? (
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            종료되었습니다
          </Text>
        ) : isApplied ? (
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            신청완료
          </Text>
        ) : (
          <Button title="신청하기" onPress={handleApply} />
        )}

      </View>
 
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
    backgroundColor: "#rgba(6, 125, 119, 0.14)",
    width: 365,
    height : 545,
    borderRadius:25,
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

export default Detail;
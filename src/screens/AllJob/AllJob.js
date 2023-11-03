import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, ScrollView, } from "react-native";
import Box from "components/Box";
import Distance from 'utils/Sorting/Distance'

const AllJob = ({navigation}) => {


    const [jobIdArray, setJobIdArray] = useState([]); // jobID 배열을 관리할 상태

    // jobIdArray 업데이트 함수
    const handleJobIdArrayUpdate = (newJobIdArray) => {
      setJobIdArray(newJobIdArray);
    };

  return (

        <SafeAreaView style={styles.BaseContainer}>

          <Text style={styles.Title}>시니어잡</Text>
          
          <Distance onJobIdArrayUpdate={handleJobIdArrayUpdate} />
          <ScrollView style={styles.scrollView}>
        <View style={styles.BorderContainer}>
       
        {Array.from({ length: Math.ceil(jobIdArray.length / 3) }).map((_, index) => (
         <View key={index} style={styles.Row}>
        {jobIdArray.slice(index * 3, (index + 1) * 3).map((jobId) => (
        <Box
          key={jobId}
          rounded={true}
          size="medium"
          color="#rgba(6, 125, 119, 0.14)"
          jobId={jobId}
        ></Box>
        ))}
        </View>
        ))}
        




        </View>
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
    height : 1000,
    borderTopEndRadius:25,
    borderTopStartRadius:25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 375,
    height: 5000,
    padding: 15,
    paddingBottom: 50
  },
    scrollView: {
    // backgroundColor: "yellow",
    height : 5000,
    borderTopEndRadius:25,
    borderTopStartRadius:25,
    width: 375,
    height: 580,
  },
  Row:{
    // backgroundColor: "pink",
    width: 340,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding:5
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

export default AllJob;
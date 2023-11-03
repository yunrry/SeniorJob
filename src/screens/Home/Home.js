import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, ScrollView, } from "react-native";
import { FIREBASE_DB } from '../../../firebaseConfig';
import { ref as sRef, get } from 'firebase/database';
import Test from "components/Test";
import Box from "components/Box";
import RBox from "components/RBox";
import Search from "components/Search";
import DataUp from "utils/Firebase/DataUp";
import UpdateRandomBookmarks from "utils/Firebase/UpdateRandomBookmarks";
import Popularity from 'utils/Sorting/Popularity';
import KKO from "utils/API/KKO";
import Distance from 'utils/Sorting/Distance'

const Home = ({navigation}) => {

  const [jobIdArray, setJobIdArray] = useState([]); // jobID 배열을 관리할 상태
  const [topJobIds, setTopJobIds] = useState([]);

  const handlePopularJobIdArrayUpdate = (jobIds) => {
    setTopJobIds(jobIds);
  };
  // jobIdArray 업데이트 함수
  const handleCloserJobIdArrayUpdate = (newJobIdArray) => {
    setJobIdArray(newJobIdArray);
  };


  
  return (
        <SafeAreaView style={styles.BaseContainer}>
          <Text style={styles.Title}>시니어잡</Text>
          <Search/>
          <ScrollView style={styles.BorderContainer}>
          <Distance onJobIdArrayUpdate={handleCloserJobIdArrayUpdate} />
          <Popularity onJobIdArrayUpdate={handlePopularJobIdArrayUpdate } />
          <RBox/>
          {/* <Test/> */}
          {/* <DataFetching /> */}
          {/* 앱 초기화시 실행 <DataUp /> 
               <KKO />*/}
          {/* <UpdateRandomBookmarks /> */}
          <View style={styles.WrapText}>
             <Text style={styles.ConText}>가까운 일자리</Text>
          </View>
          <ScrollView horizontal={true}>
        <View style={styles.Row}>
         {jobIdArray.slice(0, 9).map((jobId) => (
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
             <Text style={styles.ConText}>인기많은 일자리</Text>
          </View>
          <ScrollView horizontal={true}>
        <View style={styles.Row}>
         {topJobIds.slice(0, 9).map((jobId) => (
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



          </ScrollView>
          
        </SafeAreaView>
  );
};



// "acptMthd": "방문",
// "deadline": "접수중",
// "emplymShp": "CM0105",
// "emplymShpNm": "CM0105",
// "frDd": "20231024",
// "jobId": "K161132310240051",
// "oranNm": "주식회사 조아소프트",
// "organYn": "N",
// "recrtTitle": "야근이 없는 경력직 모바일UI 및 웹디자이너를 모십니다. (정규직 웹디자인)",
// "stmId": "B",
// "stmNm": "워크넷",
// "toDd": "20231103",
// "workPlc": "130120",
// "workPlcNm": "전북 전주시 완산구"




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
    // alignItems: 'center',
    marginTop : 20,
    width: 375,
    height: 580,
    padding: 25,
    paddingLeft: 28,
    paddingBottom: 60
  },

  Row:{
    // backgroundColor: "pink",
    width: 1000,
    height: 115,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default Home;
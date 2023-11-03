import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { FIREBASE_DB, FIREBASE_DB2, FIREBASE_AUTH  } from '../../firebaseConfig';
import { ref as sRef, get, set } from 'firebase/database';
import { useNavigation } from "@react-navigation/native";
import BookmarkButton from 'components/BookmarkButton';

function Box({ rounded, size, color, jobId }) {
  const [recrtTitle, setRecrtTitle] = useState(""); // recrtTitle을 상태로 저장
  const navigation = useNavigation();
  const [data, setData] = useState({});
//   const [isBookmarked, setIsBookmarked] = useState(false);
  const handlePress = () => {
    navigation.navigate("DetailScreen", { jobId, recrtTitle, data });
  };

  
  useEffect(() => {
    async function fetchDataForId(id) {
      const dataRef = sRef(FIREBASE_DB, id); // Firebase 데이터베이스에서 특정 ID의 데이터를 가져옴

      try {
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(data);
          const recrtTitle = data.recrtTitle; // 데이터에서 recrtTitle 값을 가져옴
          setRecrtTitle(recrtTitle); // 상태로 설정
        } else {
          console.log(`ID: ${id}의 데이터가 존재하지 않습니다.`);
        }
      } catch (error) {
        console.error(`ID: ${id} 데이터를 가져오는 중 오류 발생:`, error);
      }
    }

    fetchDataForId(jobId); // jobId를 사용하여 데이터를 가져옴
  }, [jobId]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.box,
          rounded && styles.rounded,
          sizes[size],
          { backgroundColor: color },
          { marginTop: 5 },
          { padding: 7}
        ]}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{recrtTitle}</Text>
        <BookmarkButton jobId={jobId} />
      </View>
    </TouchableWithoutFeedback>
  );
}

Box.defaultProps = { size: "medium", color: "black" };

const styles = StyleSheet.create({
  box: {
    backgroundColor: "black",
  },
  rounded: {
    borderRadius: 16,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 96,
    height: 110,
    marginRight : 10,
  },
  large: {
    width: 340,
    height: 140,
  },
});

const sizes = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export default Box;

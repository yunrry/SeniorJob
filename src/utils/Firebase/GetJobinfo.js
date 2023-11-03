// utilities.js (또는 원하는 파일명)
import { ref as sRef, get } from "firebase/database";
import { FIREBASE_DB } from '../../../firebaseConfig';

export const GetJobinfo = async (index, specificKey) => {
  try {
    // Firebase Realtime Database에서 데이터 가져오기
    const dataRef = sRef(FIREBASE_DB); // 데이터 경로 설정
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const fetchedData = snapshot.val();
      const dataArray = Object.values(fetchedData); // 배열로 변환
      if (dataArray && dataArray.length > index && specificKey) {
        return dataArray[index].specificKey;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    return null;
  }
};

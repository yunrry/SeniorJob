import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { FIREBASE_DB } from '../../../firebaseConfig';
import { ref as sRef, get, update, remove } from 'firebase/database';

function removeFirstWord(address) {
  const firstSpaceIndex = address.indexOf(' ');
  if (firstSpaceIndex !== -1) {
    return address.substring(firstSpaceIndex + 1).trim();
  }
  return address;
}

async function convertAddressToGeocode(address) {
  const KAKAO_API_KEY = '81690c30df6a6244c111889af1e33cfb';
  const cleanedAddress = removeFirstWord(address);

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${cleanedAddress}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("응답!");
      if (data.documents && data.documents.length > 0) {
        const geocode = data.documents[0];
        return { latitude: geocode.y, longitude: geocode.x };
      }
    } else {
      console.error('에러 발생:', response.statusText);
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }

  return null;
}

export default function KKO() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataRef = sRef(FIREBASE_DB);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          const dataArray = Object.values(fetchedData);

          if (dataArray && dataArray.length > 0) {
            setData(dataArray);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAndSaveGeocodes() {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const geocodeData = await convertAddressToGeocode(item.plDetAddr);
    
        if (geocodeData) {
          // 경위도를 현재 아이템에 추가
          const newItem = {
            ...item,
            longitude: geocodeData.longitude, // 위경도 데이터를 추가
            latitude: geocodeData.latitude,   // 위경도 데이터를 추가
          };
    
          // Firebase Realtime Database에서 해당 데이터 아이템 가져오기
          const itemRef = sRef(FIREBASE_DB, item.jobId);
    
          try {
            // Firebase Realtime Database에 데이터 업데이트
            await update(itemRef, newItem);
            console.log('Data updated with latitude and longitude.');
          } catch (error) {
            console.error('데이터 업데이트 에러:', error);
          }
        }
      }
    }

    // 주소에서 위경도를 가져와서 Firebase에 데이터를 업데이트하는 함수 실행
    fetchAndSaveGeocodes();
  }, [data]);

  return (
    <View>
      {/* 여기에 필요한 UI를 추가할 수 있습니다. */}
    </View>
  );
}

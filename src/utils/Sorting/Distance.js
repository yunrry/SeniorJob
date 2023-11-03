import React, { useEffect, useState } from 'react';
import { ref as sRef, get, set } from "firebase/database";
import { FIREBASE_DB } from '../../../firebaseConfig';

const Distance = ({ onJobIdArrayUpdate }) => {

const [jobIdArray, setJobIdArray] = useState([]); // 상태로 jobID 배열을 관리

  
  useEffect(() => {
    const currentLocation = { latitude: 37.5902, longitude: 127.0161 }; // 현재 위치 (서울시 성북구 보문동)

    const dataRef = sRef(FIREBASE_DB);

    // Firebase Realtime Database에서 jobID 및 해당 위치 정보 조회
    const jobLocations = []; // 각 jobID의 위치 정보를 저장할 배열

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (const jobId in data) {
            const item = data[jobId];

            // 각 jobID의 위치 정보를 저장
            if (item.latitude && item.longitude) {
              jobLocations.push({
                jobId,
                location: { latitude: item.latitude, longitude: item.longitude },
              });
            }
          }


          // 거리를 계산하고 가까운 순으로 정렬
          jobLocations.forEach((job) => {
            const jobLocation = job.location;
            const distance = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              jobLocation.latitude,
              jobLocation.longitude
            );
            job.distance = distance;
          });

          jobLocations.sort((a, b) => a.distance - b.distance);

          // jobID 배열 생성
          const jobIdArray = jobLocations.slice(0, 100).map((job) => job.jobId);
          console.log('가까운 순으로 정렬된 jobID 배열 (최대 100개):', jobIdArray);
          onJobIdArrayUpdate(jobIdArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Firebase Realtime Database:', error);
      });
  }, []);

  return null;
};

// 두 지점 사이의 거리 계산 함수 (Haversine formula 사용)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
  
    const R = 6371; // 지구의 반지름 (km)
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  }

export default Distance;
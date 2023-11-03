import React, { useEffect } from 'react';
import { ref as sRef, set, child, get, remove } from "firebase/database";
import { FIREBASE_DB } from '../../../firebaseConfig';
import jobData from '../data/margedData.json'; // JSON 파일 경로를 올바르게 수정하세요

const DataUp = () => {
  useEffect(() => {
    // Firebase Realtime Database 참조
    const dataRef = sRef(FIREBASE_DB);

    // 기존 데이터 삭제
    remove(dataRef)
      .then(() => {
        console.log('Existing data in Firebase Realtime Database removed.');

        // JSON 데이터를 Firebase Realtime Database에 업로드
        const dataWithBookmarks = {}; // Prepare the data with "bookmark" key

        jobData.forEach((item) => {
          const jobId = item.jobId; // jobId 값을 고유 ID로 사용
          const itemWithBookmark = { ...item, bookmark: 0 }; // Add "bookmark" key

          dataWithBookmarks[jobId] = itemWithBookmark; // Add item to the data

          const itemRef = child(dataRef, jobId);

          // 데이터를 Firebase Realtime Database에 저장
          set(itemRef, itemWithBookmark)
            .then(() => {
              console.log(`Data with jobId ${jobId} saved to Firebase Realtime Database.`);
            })
            .catch((error) => {
              console.error(`Error saving data with jobId ${jobId} to Firebase:`, error);
            });
        });

        // Update the data in one go with "bookmark" key
        set(dataRef, dataWithBookmarks);
      })
      .catch((error) => {
        console.error('Error removing existing data from Firebase Realtime Database:', error);
      });
  }, []);

  return null;
};

export default DataUp;

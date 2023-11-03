import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import { FIREBASE_DB, FIREBASE_DB2, FIREBASE_AUTH  } from '../../firebaseConfig';
import { ref as sRef, get, set } from 'firebase/database';

function BookmarkButton({ jobId }) {

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]); // State to store user's bookmarks
// 북마크 토글 함수
  const user = FIREBASE_AUTH.currentUser;

  async function toggleBookmark(jobId) {

    if (user) {
      const uid = user.uid;
      const bookmarksRef = sRef(FIREBASE_DB2, `users/${uid}/bookmarks`);
  
      // Firebase Realtime Database에서 사용자의 북마크 목록을 가져옵니다.
      const snapshot = await get(bookmarksRef);
  
      if (snapshot.exists()) {
        const bookmarks = snapshot.val();
        if (bookmarks[jobId]) {
          // 이미 북마크된 경우, 북마크 제거
          delete bookmarks[jobId];
          setIsBookmarked(false);
        } else {
          // 북마크되지 않은 경우, 북마크 추가
          bookmarks[jobId] = true;
          setIsBookmarked(true);
        }
  
        // 업데이트된 북마크 목록을 Firebase Realtime Database에 저장
        await set(bookmarksRef, bookmarks);
      } else {
        // 북마크 목록이 아직 없는 경우, 새로운 목록 생성
        const newBookmarks = { [jobId]: true };
        await set(bookmarksRef, newBookmarks);
      }
    }
  }

  useEffect(() => {
    if (bookmarks.includes(jobId)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, []);
 
   
  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const uid = user.uid;
      const bookmarksRef = sRef(FIREBASE_DB2, `users/${uid}/bookmarks`);

      // Fetch the user's bookmarks from Firebase Realtime Database
      get(bookmarksRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const bookmarksData = snapshot.val();
            const bookmarkedJobIds = Object.keys(bookmarksData);
            setBookmarks(bookmarkedJobIds);
          }
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
        });
    }
  }, [jobId]);
 


  return (
    <TouchableOpacity onPress={() => toggleBookmark(jobId)}>
      <Text style={isBookmarked ? styles.bookmarked : styles.unbookmarked, {fontSize: 15}}>
        {isBookmarked ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookmarked: {
    color: 'gold',
    fontSize: 24,
  },
  unbookmarked: {
    color: 'gray',
    fontSize: 24,
  },
});

export default BookmarkButton;

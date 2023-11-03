import React, { useEffect } from 'react';
import { ref as sRef, get, set } from "firebase/database";
import { FIREBASE_DB } from '../../../firebaseConfig';

// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const UpdateRandomBookmarks = () => {
  useEffect(() => {
    // Fetch the existing data
    const dataRef = sRef(FIREBASE_DB);

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Update the bookmarks for 100 random job IDs
          for (let i = 0; i < 100; i++) {
            const randomJobId = getRandomJobId(data);
            const randomBookmark = getRandomInt(1, 100);

            if (data[randomJobId]) {
              // Update the bookmark value
              data[randomJobId].bookmark = randomBookmark;
            }
          }

          // Update the database with modified data
          set(dataRef, data)
            .then(() => {
              console.log('Bookmarks updated successfully.');
            })
            .catch((error) => {
              console.error('Error updating bookmarks:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Firebase Realtime Database:', error);
      });
  }, []);

  // Function to get a random job ID from the existing data
  const getRandomJobId = (data) => {
    const jobIds = Object.keys(data);
    const randomIndex = getRandomInt(0, jobIds.length - 1);
    return jobIds[randomIndex];
  };

  return (
    <></>
  );
};

export default UpdateRandomBookmarks;

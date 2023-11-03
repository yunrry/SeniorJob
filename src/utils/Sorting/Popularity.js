import React, { useEffect, useState } from 'react';
import { ref as sRef, get, query, orderByChild, limitToLast } from "firebase/database";
import { FIREBASE_DB } from '../../../firebaseConfig';

const Popularity = ({ onJobIdArrayUpdate }) => {
    const [jobIdArray, setJobIdArray] = useState([]);

  useEffect(() => {
    // Create a reference to the Firebase Realtime Database
    const dataRef = sRef(FIREBASE_DB);

    // Create a query to order the data by 'bookmark' in descending order and limit the results to the top 100
    const queryRef = query(dataRef, orderByChild('bookmark'), limitToLast(100));

    get(queryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Extract job IDs from the data
          const jobIds = Object.keys(data);
          setJobIdArray(jobIds);
          // Send the job ID array to the parent component
          onJobIdArrayUpdate(jobIds);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Firebase Realtime Database :', error);
      });
  }, [onJobIdArrayUpdate]);

  return null;
};

export default Popularity;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { ref as sRef, get, DataSnapshot } from 'firebase/database';
// import { FIREBASE_DB } from '../../firebaseConfig';

// function DataFetching() {
//   const [data, setData] = useState([]); // Store the fetched data
//   const [currentPage, setCurrentPage] = useState(1); // Current page number
//   const itemsPerPage = 10; // Number of items to fetch per page
  
//   const fetchSpecificData = async () => {
//     try {
//       const dataRef = sRef(FIREBASE_DB);
//       const snapshot = await get(sRef(dataRef, 'DdA3192310312004'));
  
//       if (snapshot.exists()) {
//         const specificData = snapshot.val();
//         console.log('Data:', specificData);
//       } else {
//         console.log('Data with ID not found.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
//   fetchSpecificData();


//   // // Function to fetch data for the given page
//   // const fetchDataForPage = async (page) => {
//   //   try {
//   //     const dataRef = sRef(FIREBASE_DB);

//   //     // Calculate the starting index for the current page
//   //     const startIndex = (page - 1) * itemsPerPage;

//   //     // Create a query to fetch data for the current page
//   //     const dataQuery = get(dataRef);
//   //     const snapshot = await get(dataQuery);

//   //     if (snapshot.exists()) {
//   //       // Convert the data snapshot to an array
//   //       const dataObject = snapshot.val();
//   //       const dataKeys = Object.keys(dataObject);
//   //       const pageData = dataKeys.slice(startIndex, startIndex + itemsPerPage).map(key => dataObject[key]);
//   //       setData(pageData);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error);
//   //   }
//   // };

//   // // Fetch data for the initial page
//   // useEffect(() => {
//   //   fetchDataForPage(currentPage);
//   // }, [currentPage]);

//   // Function to handle next page button click
//   const handleNextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   // Function to handle previous page button click
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <View>
//       <Text>Data for Page{currentPage}:</Text>
//       {data.map((item, index) => (
//         <Text key={index}>{item.recrtTitle}</Text>
//       ))}
//       <Button title="Previous Page" onPress={handlePreviousPage} disabled={currentPage === 1} />
//       <Button title="Next Page" onPress={handleNextPage} />
//     </View>
//   );
// }

// export default DataFetching;

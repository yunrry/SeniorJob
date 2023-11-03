// import { ref as sRef, get } from 'firebase/database';
// import { FIREBASE_DB } from '../../firebaseConfig';// Import your Firebase database configuration

// export default function Test(){

// const fetchSpecificData = async () => {
//   try {
//     const dataRef = sRef(FIREBASE_DB);
//     const snapshot = await get(sRef(dataRef, 'DdA3192310312004'));

//     if (snapshot.exists()) {
//       const specificData = snapshot.val();
//       console.log('Data:', specificData);
//     } else {
//       console.log('Data with ID not found.');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// fetchSpecificData();

//     return(
//         <></>
//     );
// }
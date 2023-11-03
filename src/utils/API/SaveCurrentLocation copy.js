// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import * as Location from 'expo-location';
// import KKO from './KKO'
// import { FIREBASE_DB } from '../../../firebaseConfig';
// import { ref as sRef, get } from 'firebase/database';


// const SaveCurrentLocation = () => {
// const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // 위치 권한 요청
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('위치 권한이 필요합니다.');
//         return;
//       }

//       // 현재 위치 가져오기
//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);
//     })();
//   }, []);

//   // 위치 저장 로직 (예: 서버로 전송 또는 로컬 저장)
//   const saveLocation = () => {
//     if (location) {
//       // 여기에 위치를 저장하는 로직을 추가할 수 있습니다.
//       console.log('현재 위치:', location);
//       // 위치를 서버로 전송하거나 로컬 스토리지에 저장하는 등의 작업을 수행합니다.
//     } else {
//       console.log('위치 정보를 가져올 수 없습니다.');
//     }
//   };




//   return (
//     <View>
//       <Text>Current Location:</Text>
//       {location ? (
//         <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
//       ) : (
//         <Text>Loading location...</Text>
//       )}
//       <Button title="Save Location" onPress={saveLocation} />
//       <KKO />
//     </View>
//   );
// };

// export default SaveCurrentLocation;

import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { ref as sRef, get } from 'firebase/database';
import { FIREBASE_DB } from '../../firebaseConfig';
import SearchResults from 'screens/SearchResults/SearchResults';
export default function Search() {
  const navigation = useNavigation(); // Get navigation object
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Firebase Realtime Database에서 데이터 가져오기
    const dataRef = sRef(FIREBASE_DB);

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Firebase:', error);
      });
  }, []);

  const handleSearch = () => {
// Clear the search results array
    setIsSearching(true);
    setSearchResults([]); 
    // Convert search term to lowercase for case-insensitive comparison
    const searchTermLower = search.toLowerCase();
  
    // Filter the data to find matching items
    const matchingItems = data.filter((item) => {
      const valuesToCompare = [
        item.wantedTitle,
        item.recrtTitle,
        item.oranNm,
        item.etcItm,
        item.deadline,
        item.plDetAddr,
        item.workPlcNm,
      ];
  
      for (const value of valuesToCompare) {
        if (value && value.toLowerCase().includes(searchTermLower)) {
          return true; // If any value matches, include this item
        }
      }
  
      return false; // No match found for this item
    });
  
    // Extract matching jobIds
    const matchingJobIds = matchingItems.map((item) => item.jobId);
  
    // Update the searchResults state with matching jobIds
    setSearchResults(matchingJobIds);
  
    // Navigate to the SearchResults screen
   navigation.navigate('SearchResults', { searchResults: matchingJobIds });
  };
  

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.box}
        placeholder="검색어를 입력하세요"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <View style={styles.button}>
        <Button title="검색" onPress={handleSearch} />
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "white",
    width: 330,
    height: 45,
    marginLeft: 24,
    marginTop: 17,
    borderRadius: 50,
    paddingLeft : 10,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  box: {
    // backgroundColor: "white",
    marginLeft: 10,
    width: 245,
    height: 45,
  },
  button: {
    // backgroundColor: "pink",
    width: 48,
    height: 45,
    flexDirection:'row',
    alignItems: 'center'
  },
});

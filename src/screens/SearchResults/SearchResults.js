import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Search from "components/Search";
import Box from "components/Box"; // Import the Box component

const SearchResults = ({ route }) => {
  const { searchResults } = route.params;

  return (
    <SafeAreaView style={styles.BaseContainer}>
      <Text style={styles.Title}>시니어잡</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.BorderContainer}>
          {Array.from({ length: Math.ceil(searchResults.length / 3) }).map(
            (_, index) => (
              <View key={index} style={styles.Row}>
                {searchResults.slice(index * 3, (index + 1) * 3).map((jobId) => (
                  <Box
                    key={jobId}
                    rounded={true}
                    size="medium"
                    color="#rgba(6, 125, 119, 0.14)"
                    jobId={jobId}
                  />
                ))}
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BaseContainer: {
    backgroundColor: "#rgb(6, 125, 119)",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
  },
  BorderContainer: {
    backgroundColor: "white",
    height: 700,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    marginTop: 30,
    width: 393,
    height: 580,
    padding: 27,
    paddingBottom: 50,
  },
  Row: {
    width: 340,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 26,
    marginLeft: 20,
  },
  ConText: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
  WrapText: {
    width: 340,
    height: 28,
    marginTop: 25,
    justifyContent: "flex-start",
  },
});

export default SearchResults;

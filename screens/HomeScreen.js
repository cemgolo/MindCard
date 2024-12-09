import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeckList from '../components/DeckList';
import StatusBar from '../components/StatusBar';
import AddButton from '../components/AddButton';
import SearchHeader from '../components/wrappers/SearchHeader';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(''); // State for search input

  useEffect(() => {
    // Set the title for the header when the screen is rendered
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>MindCard</Text>
          <Text style={styles.screenName}>Home</Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Status</Text>
      <StatusBar />
      <SearchHeader
        outerStyle={styles.header}
        searchText={searchText}
        setSearchText={setSearchText}
        placehold={'Search decks...'}
      >
        <Text style={styles.subtitle}>Decks</Text>
      </SearchHeader>
      <DeckList searchText={searchText}/>
      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10, // Add spacing between the app name and screen name
  },
  screenName: {
    fontSize: 18,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;

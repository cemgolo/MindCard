import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeckList from '../components/DeckList';
import StatusBar from '../components/StatusBar';
import AddButton from '../components/AddButton';
import SearchHeader from '../components/SearchHeader';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(''); // State for search input

  useEffect(() => {
    // Set the title for the header when the screen is rendered
    navigation.setOptions({
      headerTitle: () => (
        <SearchHeader style={styles.headerContainer} searchText={searchText} setSearchText={setSearchText}>
          <Text style={styles.headerTitle}>MindCard</Text>
          <Text style={styles.screenName}>Home</Text>
        </SearchHeader>
      ),
    });
  }, [navigation, searchText]);

  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Status</Text>
      <StatusBar />
      <DeckList />
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  screenName: {
    fontSize: 18,
    color: '#555',
  },
});

export default HomeScreen;

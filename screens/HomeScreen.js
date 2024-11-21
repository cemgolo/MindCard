import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeckList from '../components/DeckList';
import StatusBar from '../components/StatusBar';
import AddButton from '../components/AddButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [decks, setDecks] = useState([]); // State to manage the list of decks

  useEffect(() => {
    // Set the title for the header when the screen is rendered
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>MindCard</Text>
          <Text style={styles.screenName}>Home</Text>
        </View>
      ),
    });
  }, [navigation]);

  // Function to add a new deck
  const addDeck = (deckName) => {
    setDecks((prevDecks) => [...prevDecks, { id: Date.now(), name: deckName }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Status</Text>
      <StatusBar />
      <DeckList decks={decks} /> {/* Pass decks to the DeckList component */}
      <AddButton addDeck={addDeck} /> {/* Pass addDeck function to AddButton */}
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

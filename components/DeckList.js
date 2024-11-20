import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeckList = () => {
  const navigation = useNavigation();

  // Sample decks data
  const decks = [
    {
      id: '1',
      name: 'Fruit vocab',
      totalCards: 50,
      cardsPerRound: 10,
      performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
    },
    {
      id: '2',
      name: 'Rocket science',
      totalCards: 80,
      cardsPerRound: 10,
      performance: { seen: 40, learned: 30, failed: 10, toReview: 0 },
    },
  ];

  const handleDeckPress = (deck) => {
    navigation.navigate('DeckDetail', { deck });
  };

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeckPress(item)} style={styles.deckItem}>
      <Text style={styles.deckName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={decks}
      keyExtractor={(item) => item.id}
      renderItem={renderDeckItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  deckItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deckName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DeckList;

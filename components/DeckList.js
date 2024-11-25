import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const DeckList = () => {
  const navigation = useNavigation();
  const decks = useSelector(state => state.decks);

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
      keyExtractor={(_, i) => i}
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

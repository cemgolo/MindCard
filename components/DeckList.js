import React from 'react';
import { Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DeleteButton from './DeleteButton';
import { deleteDeck } from '../storage/actions';

const DeckList = ({ searchText }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const decks = useSelector(state => state.decks);

  const handleDeleteDeck = (deckName) => {
    dispatch(deleteDeck(deckName));
  };

  const filteredDecks = decks.filter(deck =>
    deck.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeckPress = (deck) => {
    navigation.navigate('DeckDetail', { deckName: deck.name });
  };

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeckPress(item)} style={styles.deckItem}>
      <Text style={styles.deckName}>{item.name}</Text>
      <DeleteButton onPress={() => handleDeleteDeck(item.name)}/>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredDecks}
      keyExtractor={(_, index) => index.toString()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardList from '../components/CardList';
import SearchHeader from '../components/SearchHeader';
import { useSelector } from 'react-redux';

const EditDeckScreen = ({ route }) => {
  const { deckName } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.name === deckName));
  const [newDeckName, setNewDeckName] = useState(deck.name); // State for deck name
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [searchText, setSearchText] = useState(''); // State for search input

  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SearchHeader outerStyle={styles.header} searchText={searchText} setSearchText={setSearchText} placehold={'Search cards...'}>
          <View style={styles.headerContent}>
            {isEditing ? (
              <TextInput
                style={styles.deckNameInput}
                value={newDeckName}
                onChangeText={setNewDeckName}
                autoFocus
                onSubmitEditing={handleSave} // Save on pressing Enter
              />
            ) : (
              <Text style={styles.deckName}>{newDeckName}</Text>
            )}
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                <Icon
                  name={isEditing ? 'check' : 'edit'}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
              {/* Search Icon */}
            </View>
          </View>
      </SearchHeader>

      {/* Card List */}
      <CardList searchText={searchText} />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log('Add new card')} // demo button 
      >
        <Icon name="add" size={38} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#ccc',
    padding: 15,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "100%"
  },
  deckName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deckNameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 0,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default EditDeckScreen;

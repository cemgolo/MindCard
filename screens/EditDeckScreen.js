import { useState } from 'react';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardList from '../components/CardList';
import SearchButton from '../components/SearchButton';

const EditDeckScreen = ({ route, navigation }) => {
  const { deck } = route.params;
  const [deckName, setDeckName] = useState(deck.name); // State for deck name
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [searchText, setSearchText] = useState(''); // State for search input

  const handleSave = () => {
    console.log('Updated Deck Name:', deckName);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {isEditing ? (
          <TextInput
            style={styles.deckNameInput}
            value={deckName}
            onChangeText={setDeckName}
            autoFocus
            onSubmitEditing={handleSave} // Save on pressing Enter
          />
        ) : (
          <Text style={styles.deckName}>{deckName}</Text>
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
          <SearchButton setSearchText={setSearchText} />
        </View>
      </View>

      <CardList searchText={searchText} />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log('Add new card')}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 15,
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
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
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

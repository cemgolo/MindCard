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
import { useDispatch } from 'react-redux';
import { UPDATE_DECK_NAME } from '../storage/actions';

const EditDeckScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { deck } = route.params;
  const [newName, setNewName] = useState(deck.name);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');

  console.log('Current decks in state:', newName);

  const handleSave = () => {
    console.log('Dispatching update action with:', { oldName: deck.name, newName });
    dispatch({
      type: UPDATE_DECK_NAME,
      payload: { oldName: deck.name, newName }
    });
    
    navigation.setParams({
      deck: { ...deck, name: newName },
    });

    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SearchHeader outerStyle={styles.header} searchText={searchText} setSearchText={setSearchText} placehold={'Search cards...'}>
          <View style={styles.headerContent}>
            {isEditing ? (
              <TextInput
                style={styles.deckNameInput}
                value={newName}
                onChangeText={setNewName}
                autoFocus
                onSubmitEditing={handleSave}
              />
      
            ) : (
              <Text style={styles.deckName}>{newName}</Text>
            )}
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                  onPress={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true); 
                    }
                  }}
                >                
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
        onPress={() => navigation.navigate('EditCardScreen', { deckName: deck.name, card: null })}
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

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditDeckScreen = ({ route, navigation }) => {
  const { deck } = route.params;

  // Sample card data (replace with actual data)
  const cards = deck.cards || [
    { id: '1', name: 'An orange', image: require('../assets/orange.jpeg') },
    { id: '2', name: 'A pear', image: require('../assets/orange.jpeg') },
    { id: '3', name: 'A banana', image: require('../assets/orange.jpeg') },
    { id: '4', name: 'A tomato', image: require('../assets/orange.jpeg') },
    { id: '5', name: 'An apple', image: require('../assets/orange.jpeg') },
  ];

  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      {/* Card Image */}
      <Image source={item.image} style={styles.cardImage} />
      {/* Card Name */}
      <Text style={styles.cardText}>{item.name}</Text>
      {/* Edit Icon */}
      <TouchableOpacity onPress={() => console.log(`Edit card: ${item.name}`)}>
        <Ionicons name="pencil" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.deckName}>{deck.name}</Text>
        <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => console.log('Edit icon clicked')}>
            <Ionicons name="pencil" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Search icon clicked')}>
            <Ionicons name="search" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards List */}
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log('Add new card')}
      >
        <Ionicons name="add" size={36} color="#fff" />
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  cardList: {
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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

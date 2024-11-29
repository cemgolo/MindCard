import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardList = ({ searchText }) => {
  const navigation = useNavigation();

  // const cards = useSelector(state => state.cards);
  
  // Example static cards, you can replace this with your Redux state or API call
  const cards = [
    { id: '1', name: 'Card 1', /*image: require('../assets/card1.jpg')*/ },
    { id: '2', name: 'Card 2', /*image: require('../assets/card2.jpg')*/ },
    { id: '3', name: 'Card 3', /*image: require('../assets/card3.jpg')*/ },
  ];

  // Filter cards based on the search text
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCardPress = (card) => {
    navigation.navigate('EditCard', { card });
  };

  const renderCardItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <Icon
          name="edit"
          size={24}
          color="#333"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={filteredCards}
      renderItem={renderCardItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.cardList}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default CardList;


import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const CardList = ({ searchText }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const { deck } = route.params;

  const cards = useSelector((state) => {
    const selectedDeck = state.decks.find((d) => d.name === deck.name);
    return selectedDeck ? selectedDeck.cards : [];
  });

  const filteredCards = searchText
  ? cards.filter(card =>
      card.frontDescription.toLowerCase().includes(searchText.toLowerCase())
    )
  : cards;


  const handleCardPress = (card) => {
    navigation.navigate('EditCardScreen', { deckName: deck.name, card });
  };

  const renderCardItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image
        source={item.frontImage ? { uri: item.frontImage } : require('../assets/placeholder.jpg')}
        style={styles.cardImage}
      />
      <Text style={styles.cardText}>
        {item.frontDescription || ""}
      </Text>
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <Icon name="edit" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
  

  return (
    <FlatList
      data={filteredCards}
      renderItem={renderCardItem}
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
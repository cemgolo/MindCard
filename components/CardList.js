import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const CardList = ({ deck, searchText }) => {
  const navigation = useNavigation();
  const cards = useSelector((state) => {
    const selectedDeck = state.decks.find(item => item.name === deck.name);
    return selectedDeck ? selectedDeck.cards : [];
  });

  const filteredCards = searchText
  ? cards.filter(card =>
      card.frontDescription.toLowerCase().includes(searchText.toLowerCase())
    )
  : cards;


  const handleCardPress = (card) => {
    navigation.navigate('EditCardScreen', { deckName: deck.name, cardUuid: card.uuid });
  };

  const renderCardItem = ({ item }) => (
    <CardItem card={item} onPress={() => handleCardPress(item)} />
  );

  return (
    <FlatList
      data={filteredCards}
      renderItem={renderCardItem}
      contentContainerStyle={styles.cardList}
    />
  );
};

const CardItem = ({ card, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={card.content.front.imageUrl ? { uri: card.content.front.imageUrl } : require('../assets/placeholder.jpg')}
        style={styles.cardImage}
      />
      <Text style={styles.cardText}>
        {card.content.front.text || ""}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name="edit"
          size={24}
          color="#333"
        />
      </TouchableOpacity>
    </View>
  )
}

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
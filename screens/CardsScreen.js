// src/screens/DeckDetailScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FlashCard from '../components/FlashCard';

const CardsScreen = ({ route }) => {
  const { deck } = route.params;

  if (!deck.cards || deck.cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No cards available for this deck.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.name}</Text>
      <FlatList
        data={deck.cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FlashCard front={item.front} back={item.back} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CardsScreen;

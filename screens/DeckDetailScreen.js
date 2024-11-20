import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deck } = route.params;

  return (
    <View style={styles.container}>
      {/* Deck Name */}
      <Text style={styles.deckName}>{deck.name}</Text>

      {/* Deck Details */}
      <Text style={styles.detailText}>Total Cards: {deck.totalCards}</Text>
      <Text style={styles.detailText}>Cards Per Round: {deck.cardsPerRound || 10}</Text>
      <Text style={styles.detailText}>
        Performance: {deck.performance.seen} seen, {deck.performance.learned} learned,{' '}
        {deck.performance.failed} failed, {deck.performance.toReview} to review
      </Text>

      {/* Start Button */}
      <Button title="Start" onPress={() => console.log('Start deck')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
});

export default DeckDetailScreen;

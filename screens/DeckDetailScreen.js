import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import buttonStyles from '../styles/buttons';

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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[buttonStyles.secondary, {flex: 1}]} onPress={() => console.log("Edit deck")}>
          <Text style={buttonStyles.secondaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyles.primary, {flex: 3}]} onPress={() => navigation.navigate('CardsScreen', { deck })}>
          <Text style={buttonStyles.primaryText}>Start</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 50,
  },
});

export default DeckDetailScreen;
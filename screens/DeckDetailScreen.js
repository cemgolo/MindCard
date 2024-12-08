import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PieChart from '../components/PieChart';
import buttonStyles from '../styles/buttons';
import { State } from 'ts-fsrs';
import { useSelector } from 'react-redux';

function createPieData(cards) {
  const STATES = [
    { name: "New", color: "blue" },
    { name: "Learning", color: "green" },
    { name: "Review", color: "yellow" },
    { name: "Relearning", color: "red" }
  ];

  return STATES.map(state => ({
    name: state.name,
    count: cards.filter(card => card.state === State[state.name]).length,
    color: state.color,
    legendFontColor: "#333",
    legendFontSize: 14
  }));
}

const DeckDetailScreen = ({ route, navigation }) => {
  const { deckId } = route.params;

  const deck = useSelector(state => state.decks.find(deck => deck.id === deckId));
  const dueCards = deck.cards.filter(card => card.due <= new Date())
  console.log(dueCards);

  return (
    <View style={styles.container}>
      <Text style={styles.deckName}>{deck.name}</Text>
      <Text style={styles.detailText}>Total Cards: {deck.totalCards}</Text>
      <Text style={styles.detailText}>Cards Per Round: {deck.cardsPerRound || 10}</Text>

      {/* Pie Chart Component */}
      <PieChart data={createPieData(deck.cards)} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.secondary, { flex: 1 }]}
          onPress={() => navigation.navigate('EditDeckScreen', { deck: deck, })}>
          <Text style={buttonStyles.secondaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyles.primary, {flex: 3}]} onPress={() => navigation.navigate('StartScreen', { deck })}>
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
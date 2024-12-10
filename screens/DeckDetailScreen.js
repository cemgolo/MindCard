import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import PieChart from '../components/PieChart';
import buttonStyles from '../styles/buttons';
import { State } from 'ts-fsrs';
import { useSelector } from 'react-redux';
import { generateSessionCards, isDue } from '../storage/helper';
import ReviewInAdvanceDialog from '../components/dialogs/ReviewInAdvanceDialog';

function createPieData(sessionCards) {
  const STATES = [
    { name: "New", color: "blue" },
    { name: "Learning", color: "green" },
    { name: "Review", color: "yellow" },
    { name: "Relearning", color: "red" }
  ];

  return STATES.map((state, i) => ({
    name: state.name,
    count: sessionCards[i]?.filter(card => isDue(card) && card.state === State[state.name]).length ?? 0,
    color: state.color,
    legendFontColor: "#333",
    legendFontSize: 14
  }));
}

const DeckDetailScreen = ({ route, navigation }) => {
  const { deckName } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.name === deckName));
  
  const sessionCards = generateSessionCards(deck);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const start = () => {
    if (Object.keys(sessionCards).length > 0) {
      navigation.navigate('ReviewSessionScreen', { deckName });
    } else {
      setIsPopupVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.deckName}>{deckName}</Text>
      <Text style={styles.detailText}>Total Cards: {deck.cards.length}</Text>

      {/* Pie Chart Component */}
      <PieChart data={createPieData(sessionCards)} title='Cards to study today' />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.secondary, { flex: 1 }]}
          onPress={() => navigation.navigate('EditDeckScreen', { deckName: deckName, })}>
          <Text style={buttonStyles.secondaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyles.primary, {flex: 3}]} onPress={start}>
          <Text style={buttonStyles.primaryText}>Start</Text>
        </TouchableOpacity>
      </View>
      <ReviewInAdvanceDialog
        deck={deck}
        isOpen={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
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
  }
});

export default DeckDetailScreen;
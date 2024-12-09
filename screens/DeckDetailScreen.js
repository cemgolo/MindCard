import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import PieChart from '../components/PieChart';
import buttonStyles from '../styles/buttons';
import { State } from 'ts-fsrs';
import { useSelector } from 'react-redux';
import { isDue } from '../storage/helper';
import Dialog from '../components/wrappers/Dialog';

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
  const { deckName } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.name === deckName));
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [advanceDays, setAdvanceDays] = useState(1);
  const [advanceDaysError, setAdvanceDaysError] = useState("");

  const start = () => {
    if (deck.cards.some(isDue)) {
      navigation.navigate('ReviewSessionScreen', { deckName });
    } else {
      setIsPopupVisible(true);
    }
  }

  const confirmLearnInAdvance = () => {
    const advanceDaysNum = advanceDays === "" ? 1 : parseInt(advanceDays);
    if (isNaN(advanceDaysNum)) {
      setAdvanceDaysError("Please enter a valid number.");
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + advanceDaysNum);
    
    if (deck.cards.some(card => isDue(card, date))) {
      navigation.navigate('ReviewSessionScreen', { deckName, fromDate: date });
    } else {
      setAdvanceDaysError("No cards are due until then. Please increase the time window.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.deckName}>{deckName}</Text>
      <Text style={styles.detailText}>Total Cards: {deck.cards.length}</Text>

      {/* Pie Chart Component */}
      <PieChart data={createPieData(deck.cards)} />

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

      <Dialog
        emoji="🎉"
        title="No cards are due!"
        isOpen={isPopupVisible}
        onCancel={() => { setIsPopupVisible(false); setAdvanceDaysError("") }}
        onConfirm={confirmLearnInAdvance}
      >
        <Text style={{textAlign: 'center'}}>You've learned all of the cards in this deck for now. Would you like to learn in advance?</Text>
        <View style={styles.daysInAdvanceContainer}>
          <Text>Learn</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder="1"
            value={advanceDays}
            onChangeText={setAdvanceDays}
          />
          <Text>day(s) in advance</Text>
        </View>
        {advanceDaysError && <Text style={styles.advanceDaysError}>{advanceDaysError}</Text>}
      </Dialog>
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
  daysInAdvanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10
  },
  advanceDaysError: {
    color: 'red',
    marginBottom: 20
  }
});

export default DeckDetailScreen;
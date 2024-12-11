import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import buttonStyles from '../styles/buttons';
import { useSelector } from 'react-redux';
import { generateSessionCards } from '../storage/helper';
import ReviewInAdvanceDialog from '../components/dialogs/ReviewInAdvanceDialog';
import CardStatesPieChart from '../components/CardStatesPieChart';

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
      <CardStatesPieChart cards={sessionCards} />

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
    marginBottom: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 50,
  }
});

export default DeckDetailScreen;
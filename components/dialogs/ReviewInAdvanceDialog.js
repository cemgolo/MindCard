import { useDispatch } from "react-redux";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Dialog from "./Dialog";

const ReviewInAdvanceDialog = ({ isOpen, onClose, deck }) => {
  const [deckName, setDeckName] = useState('');
  const [advanceDays, setAdvanceDays] = useState(1);
  const [advanceDaysError, setAdvanceDaysError] = useState("");
  const dispatch = useDispatch();

  const confirmLearnInAdvance = () => {
    const advanceDaysNum = advanceDays === "" ? 1 : parseInt(advanceDays);
    if (isNaN(advanceDaysNum)) {
      setAdvanceDaysError("Please enter a valid number.");
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + advanceDaysNum);
    
    if (deck.cards.some(card => isDue(card, date))) {
      const newSessionCards = generateSessionCards(deck, date);
      navigation.navigate('ReviewSessionScreen', { deckName, initialSessionCards: newSessionCards });
    } else {
      setAdvanceDaysError("No cards are due until then. Please increase the time window.");
    }
  }

  return (
    <Dialog
      emoji="🎉"
      title="No cards are due!"
      isOpen={isOpen}
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
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});

export default ReviewInAdvanceDialog;

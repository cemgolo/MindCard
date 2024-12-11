import { useDispatch } from "react-redux";
import { addDeck } from "../storage/actions";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Dialog from "./Dialog";

const AddNewDeckDialog = ({ isOpen, onClose }) => {
  const [deckName, setDeckName] = useState('');
  const dispatch = useDispatch();

  const handleCreateDeck = () => {
    const trimmedDeckName = deckName.trim();
    if (trimmedDeckName) {
      dispatch(addDeck({
        name: trimmedDeckName,
        totalCards: 0,
        cardsPerRound: 10,
        performance: { seen: 0, learned: 0, failed: 0, toReview: 0 }
      }));
      onClose();
    } else {
      alert('Please enter a deck name!');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Create a New Deck"
      confirmLabel="Create"
      onCancel={onClose}
      onConfirm={handleCreateDeck}
    >
      <TextInput
        style={styles.input}
        placeholder="Deck Name"
        value={deckName}
        onChangeText={setDeckName}
      />
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

export default AddNewDeckDialog;

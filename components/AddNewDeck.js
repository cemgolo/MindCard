import { useDispatch } from "react-redux";
import { addDeck } from "../storage/actions";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import globalStyles from "../styles/styles";

const AddNewDeck = ({ onClose }) => {
  const [deckName, setDeckName] = useState('');
  const dispatch = useDispatch();

  const handleCreateDeck = () => {
    const trimmedDeckName = deckName.trim();
    if (trimmedDeckName) {
      dispatch(addDeck({ // Add the new deck to the list
        name: trimmedDeckName,
        totalCards: 0,
        cardsPerRound: 10,
        performance: { seen: 0, learned: 0, failed: 0, toReview: 0 }
      }));
      onClose(); // Close the modal
    } else {
      alert('Please enter a deck name!');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create a New Deck</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Name"
          value={deckName}
          onChangeText={setDeckName}
        />
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.cancelButton}
            onPress={onClose}
          >
            <Text style={globalStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.createButton}
            onPress={handleCreateDeck}
          >
            <Text style={globalStyles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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

export default AddNewDeck;

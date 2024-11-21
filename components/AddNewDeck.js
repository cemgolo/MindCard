import { useDispatch } from "react-redux";
import { addDeck } from "../storage/actions";
import { useState } from "react";
import { View } from "react-native";

const AddNewDeck = ({ onClose }) => {
  const [deckName, setDeckName] = useState('');
  const dispatch = useDispatch();

  const handleCreateDeck = () => {
    if (deckName.trim()) {
      dispatch(addDeck({ // Add the new deck to the list
        name: deckName,
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

export default AddNewDeck;

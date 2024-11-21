const AddNewDeck = ({ onClose, addDeck }) => {
  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = () => {
    if (deckName.trim()) {
      addDeck(deckName); // Add the new deck to the list
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

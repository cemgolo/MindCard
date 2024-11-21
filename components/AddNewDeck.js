import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import globalStyles from '/styles/styles';

const AddNewDeck = ({ visible, onClose, onCreate }) => {
  const [deckName, setDeckName] = useState('');

  const handleCreate = () => {
    if (deckName.trim() === '') {
      alert('Please enter a deck name');
      return;
    }
    onCreate(deckName);
    setDeckName('');
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create a new deck</Text>
          <Text style={styles.label}>Deck Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter deck name"
            value={deckName}
            onChangeText={setDeckName}
          />
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity style={globalStyles.cancelButton} onPress={onClose}>
              <Text style={globalStyles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.createButton} onPress={handleCreate}>
              <Text style={globalStyles.createButtonText}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* "+" Button */}
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.option} onPress={() => alert('Add New Deck')}>
              <Icon name="folder" size={20} color="#333" />
              <Text style={styles.optionText}>Add new deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => alert('Explore Decks')}>
              <Icon name="explore" size={20} color="#333" />
              <Text style={styles.optionText}>Explore decks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => alert('Add Card')}>
              <Icon name="note-add" size={20} color="#333" />
              <Text style={styles.optionText}>Add card</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default AddButton;

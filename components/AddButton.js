import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddNewDeck from './AddNewDeck';

const AddButton = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddDeckVisible, setIsAddDeckVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const openAddDeckModal = () => {
    setIsDropdownVisible(false);
    setIsAddDeckVisible(true);
  };

  const closeAddDeckModal = () => {
    setIsAddDeckVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* "+" Button */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.addButton}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Dropdown */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.option} onPress={openAddDeckModal}>
            <Icon name="folder" size={20} color="#333" />
            <Text style={styles.optionText}>Add new deck</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add New Deck Modal */}
      <Modal visible={isAddDeckVisible} animationType="slide" transparent={true}>
        <AddNewDeck onClose={closeAddDeckModal} />
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
  dropdown: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    width: 200,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default AddButton;

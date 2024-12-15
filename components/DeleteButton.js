import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from './dialogs/Dialog';

const DeleteButton = ({ deckName, onPress }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => setIsDeleteDialogOpen(true)}>
        <Icon name="delete" size={15} color="#fff" />
      </TouchableOpacity>
      <Dialog
        emoji='⚠️'
        title='Hey there!'
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isDestructiveAction={true}
        confirmLabel='Delete'
        onConfirm={() => { setIsDeleteDialogOpen(false); onPress(); }}
      >
        <Text style={styles.dialogText}>
          <Text>Are you sure you want to remove </Text>
          <Text style={{ fontWeight: 'bold' }}>{deckName}</Text>
          <Text>?</Text>
        </Text>
        <Text style={styles.dialogText}>This action is permanent and cannot be undone.</Text>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogText: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30
  }
});

export default DeleteButton;
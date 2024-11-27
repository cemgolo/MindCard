// src/components/FlashCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FlashCard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={() => setFlipped(!flipped)}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{flipped ? back : front}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlashCard;

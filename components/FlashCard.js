import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import RatingButtons from './RatingButtons';

const FlashCard = ({ content, isFlipped, onFlip, onRate }) => {
  const side = useMemo(() => isFlipped ? 'front' : 'back', [isFlipped]);
  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {content[side].imageUrl && <Image source={{ uri: content[side].imageUrl }} />}
        <Text style={styles.cardText}>{content[side].text}</Text>
      </View>
      {isFlipped ? (
        <RatingButtons onRate={onRate} />
      ) : (
        <TouchableOpacity style={styles.flipButton} onPress={onFlip}>
          <Text style={styles.flipButtonText}>Flip card</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '80%',
    height: '50%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  cardText: {
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1, 
    maxWidth: '90%', 
  },
  flipButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    textAlignVertical: 'center',
  },
});

export default FlashCard;

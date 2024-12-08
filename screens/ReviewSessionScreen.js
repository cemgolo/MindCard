import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlashCard from '../components/FlashCard';

const ReviewSessionScreen = ({ route, navigation }) => {
  const { deck } = route.params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // Manage flipped state here

  if (!deck.cards || deck.cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No cards available for this deck.</Text>
      </View>
    );
  }

  const handleRating = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false); // Reset flipped state when moving to the next card
    } else {
      navigation.navigate('ReviewSessionEndScreen', { performanceData: [0.4, 0, 0.2, 0], deck });
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.name}</Text>
      <FlashCard
        front={deck.cards[currentCardIndex].front}
        back={deck.cards[currentCardIndex].back}
        flipped={flipped}
        onFlip={toggleFlip} // Pass flip handler
        onRate={handleRating} // Pass rating handler
      />
      <Text style={styles.progress}>
        Card {currentCardIndex + 1} of {deck.cards.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  progress: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReviewSessionScreen;

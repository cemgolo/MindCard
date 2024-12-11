import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlashCard from '../components/FlashCard';

const StartScreen = ({ route, navigation }) => {
  const { deck } = route.params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
      navigation.navigate('ReviewRoundScreen', { performanceData: [0.4, 0, 0.2, 0], deck });
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  const currentCard = deck.cards[currentCardIndex];
  console.log(currentCard); // Add this line to log the current card object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.name}</Text>
      <FlashCard
        front={currentCard.frontDescription}
        back={currentCard.backDescription}
        frontImage={currentCard.frontImage}  // Pass the front image URI
        backImage={currentCard.backImage}  // Pass the back image URI
        flipped={flipped}
        onFlip={toggleFlip}
        onRate={handleRating}
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

export default StartScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlashCard from '../components/FlashCard';
import { useDispatch, useSelector } from 'react-redux';
import { FSRS, State } from 'ts-fsrs';
import { isDue } from '../storage/helper';
import { updateCard } from '../storage/actions';
import { randomObjectValue } from '../scripts/arrays';

const ReviewSessionScreen = ({ route, navigation }) => {
  const { deckName } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.name === deckName));
  const [sessionCards, setSessionCards] = useState(
    deck.cards
      .filter(isDue)
      .reduce((obj, card) => {
        if (!(card.state in obj)) obj[card.state] = [];
        if (obj[card.state].length < deck.maxCardsEverySession[card.state]) obj[card.state].push(card);
        return obj;
      }, {})
  )

  const [currentCard, setCurrentCard] = useState(pickRandomCard());
  const [flipped, setFlipped] = useState(false); // Manage flipped state here

  const fsrs = new FSRS();
  const dispatch = useDispatch();
  
  const pickRandomCard = () => {
    const cardsOfRandomState = randomObjectValue(sessionCards);
    return cardsOfRandomState[Math.floor(Math.random() * cardsOfRandomState.length)];
  }
  const removeCardFromSession = (card) => {
    const cardIndex = sessionCards[card.state].findIndex(item => item.uuid === card.uuid);
    sessionCards[card.state].splice(cardIndex, 1);
    if (sessionCards[card.state].length === 0) delete sessionCards[card.state];
    setSessionCards(sessionCards);
  }
  const addCardToSession = (card) => {
    if (!(card.state in sessionCards)) sessionCards[card.state] = [];
    sessionCards[card.state].push(card)
    setSessionCards(sessionCards);
  }

  if (!deck.cards || deck.cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No cards available for this deck.</Text>
      </View>
    );
  }

  const handleRating = (rating) => {
    removeCardFromSession(currentCard);
    const newCard = fsrs.repeat(currentCard, new Date())[rating].card;
    dispatch(updateCard(newCard));
    if (isDue(newCard)) addCardToSession(newCard);

    if (Object.keys(sessionCards).length > 0) {
      setCurrentCard(pickRandomCard());
      setFlipped(false); // Reset flipped state when moving to the next card
    } else {
      navigation.navigate('ReviewSessionEndScreen', { deckName,  });
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.name}</Text>
      <FlashCard
        front={currentCard.content.front}
        back={currentCard.content.back}
        flipped={flipped}
        onFlip={toggleFlip} // Pass flip handler
        onRate={handleRating} // Pass rating handler
      />
      <Text style={styles.progress}>
        {/* Card {currentCardIndex + 1} of {deck.cards.length} */}
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

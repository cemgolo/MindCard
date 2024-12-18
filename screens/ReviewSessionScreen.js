import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlashCard from '../components/FlashCard';
import { useDispatch, useSelector } from 'react-redux';
import { FSRS } from 'ts-fsrs';
import { cardReviewRatings, generateSessionCards, isDue } from '../storage/helper';
import { updateCard } from '../storage/actions';
import { randomObjectValue } from '../scripts/arrays';
import ReviewSessionCardStateBar from '../components/ReviewSessionCardStateBar';

function pickRandomCard(cards) {
  const cardsOfRandomState = randomObjectValue(cards);
  return cardsOfRandomState[Math.floor(Math.random() * cardsOfRandomState.length)];
}

function removeCardFromSession(sessionCards, card) {
  const {[card.state]: _, ...otherStateCards} = sessionCards;
  const newStateCards = sessionCards[card.state].filter(item => item.uuid !== card.uuid);
  if (newStateCards.length <= 0) {
    return otherStateCards;
  } else {
    return { ...otherStateCards, [card.state]: newStateCards }
  }
}

function addCardToSession(sessionCards, card) {
  if (!(card.state in sessionCards)) sessionCards[card.state] = [];
  sessionCards[card.state].push(card)
  return sessionCards;
}

const ReviewSessionScreen = ({ route, navigation }) => {
  const { deckUuid, reviewFromDate } = route.params;
  const deck = useSelector(state => state.decks.find(deck => deck.uuid === deckUuid));
  useEffect(() => navigation.setOptions({'title': deck.name}), [navigation, deck]);

  const [sessionCards, setSessionCards] = useState(generateSessionCards(deck, reviewFromDate));
  const [userRatings, setUserRatings] = useState(cardReviewRatings.reduce((acc, rating) => ({...acc, [rating.label]: 0}), {}));
  
  const fsrs = new FSRS();
  const dispatch = useDispatch();

  const [currentCard, setCurrentCard] = useState(pickRandomCard(sessionCards));
  const [isFlipped, setIsFlipped] = useState(false); // Manage flipped state here

  const handleRating = (rating) => {
    const ratingLabel = cardReviewRatings.find(item => item.action === rating).label;
    const newRatings = { ...userRatings, [ratingLabel]: userRatings[ratingLabel] + 1 };
    setUserRatings(newRatings);

    let newSessionCards = removeCardFromSession(sessionCards, currentCard);

    const newCard = fsrs.repeat(currentCard, new Date())[rating].card;
    dispatch(updateCard(deckUuid, newCard));
    if (isDue(newCard)) newSessionCards = addCardToSession(newSessionCards, newCard);

    if (Object.keys(newSessionCards).length > 0) {
      setSessionCards(newSessionCards);
      setCurrentCard(pickRandomCard(newSessionCards));
      setIsFlipped(false); // Reset flipped state when moving to the next card
    } else {
      navigation.navigate('ReviewSessionEndScreen', { deckUuid, userRatings: newRatings });
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={{flex: 1}}>
      <ReviewSessionCardStateBar sessionCards={sessionCards} />
      <FlashCard
        content={currentCard.content}
        isFlipped={isFlipped}
        onFlip={toggleFlip} // Pass flip handler
        onRate={handleRating} // Pass rating handler
      />
    </View>
  );
};

export default ReviewSessionScreen;

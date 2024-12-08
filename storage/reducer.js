import { ADD_DECK, ADD_CARD, DELETE_CARD } from "./actions";

const initialState = {
  decks: [
      {
          name: 'Fruit vocab',
          totalCards: 50,
          cardsPerRound: 10,
          performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
          cards: [
              {   
                  id: '1',
                  frontDescription: 'Orange',
                  backDescription: 'A fruit rich in vitamin C.',
                  image: '/assets/orange.jpeg', 
              },
              {
                  id: '2',
                  frontDescription: 'Apple',
                  backDescription: 'A fruit that keeps the doctor away.',
                  image: '/assets/apple.jpeg', 
              },
          ],
      },
      {
          name: 'Rocket science',
          totalCards: 80,
          cardsPerRound: 10,
          performance: { seen: 40, learned: 30, failed: 10, toReview: 0 },
          cards: [],
      },
  ],
};

const deckReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DECK: {
        return {
          ...state,
          decks: [
            ...state.decks,
            {
              ...action.payload,
              cards: [], // Ensure the new deck has an empty cards array
            },
          ],
        };
      }
      case ADD_CARD: {
        const { deckName, card } = action.payload;
  
        return {
          ...state,
          decks: state.decks.map((deck) =>
            deck.name === deckName
              ? {
                  ...deck,
                  cards: [...(deck.cards || []), card] }
              : deck
          ),
        };
      }
      case DELETE_CARD: {
        const { deckName, cardId } = action.payload;
        return {
            ...state,
            decks: state.decks.map(deck =>
                deck.name === deckName
                    ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
                    : deck
            ),
        };
    }
      default:
        return state;
    }
  };
  

export default deckReducer;

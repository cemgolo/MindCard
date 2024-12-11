import { ADD_DECK, ADD_CARD, DELETE_CARD, ADD_EMPTY_DECK, UPDATE_CARD, DELETE_DECK } from "./actions";

const initialState = {
  decks: [
      {   
          uuid: '1',
          name: 'Fruit vocab',
          totalCards: 50,
          cardsPerRound: 10,
          performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
          cards: [
              {   
                  uuid: '1',
                  frontDescription: 'Orange',
                  backDescription: 'A fruit rich in vitamin C.',
                  frontImage: './assets/orange.jpeg', 
                  backImage: './assets/orange.jpeg', 
              },
              {
                  uuid: '2',
                  frontDescription: 'Apple',
                  backDescription: 'A fruit that keeps the doctor away.',
              },
          ],
      },
      {   
          uuid:'2',
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
            decks: [ ...state.decks, action.payload ]
        };
      }

      case ADD_EMPTY_DECK: {
        return {
            ...state,
            decks: [ ...state.decks, createDeck(action.payload) ]
        }
      }
      case ADD_CARD: {
        const { deckName, card } = action.payload;
  
        return {
          ...state,
          decks: state.decks.map((deck) =>
            deck.name === deckName
              ? {
                  ...deck,
                  cards: [...(deck.cards || []), card] 
                }
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
              ? { 
                  ...deck, 
                  cards: deck.cards.filter(card => card.uuid && card.uuid !== cardId) 
                }
              : deck
          ),
        };
      }
      case UPDATE_CARD: {
        const { deckName, updatedCard } = action.payload;
        return {
          ...state,
          decks: state.decks.map((deck) =>
            deck.name === deckName
              ? {
                  ...deck,
                  cards: deck.cards.map((card) =>
                    card.uuid === updatedCard.uuid ? updatedCard : card
                  ),
                }
              : deck
          ),
        };
      }
      case DELETE_DECK: {
        const updatedDecks = state.decks.filter((deck) => deck.name !== action.payload);
        return {
          ...state,
          decks: updatedDecks,
        };
      }

      default:
        return state;
      
  };
}
  

export default deckReducer;

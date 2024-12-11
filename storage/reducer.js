import { ADD_DECK, ADD_CARD, DELETE_CARD, ADD_EMPTY_DECK, UPDATE_CARD, UPDATE_DECK_NAME } from "./actions";

const initialState = {
  decks: [
      {
          name: 'Fruit vocab',
          totalCards: 50,
          cardsPerRound: 10,
          performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
          cards: [
              {   
                  uuid: '1',
                  frontDescription: 'Orange',
                  backDescription: 'A fruit rich in vitamin C.',
                  image: './assets/orange.jpeg', 
              },
              {
                  uuid: '2',
                  frontDescription: 'Apple',
                  backDescription: 'A fruit that keeps the doctor away.',
                  image: './assets/orange.jpeg', 
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

      case UPDATE_DECK_NAME: {
        const { oldName, newName } = action.payload;
      
        const updatedState = {
          ...state,
          decks: state.decks.map((deck) =>
            deck.name === oldName ? { ...deck, name: newName } : deck
          ),
        };
      
        return updatedState;
    }
    

    
      default:
        return state;
      
  };
}
  

export default deckReducer;

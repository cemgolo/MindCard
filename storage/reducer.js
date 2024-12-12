import { ADD_DECK, ADD_CARD, DELETE_CARD, ADD_EMPTY_DECK, UPDATE_CARD, DELETE_DECK, RENAME_DECK } from "./actions";
import { createCard, createDeck } from "./helper";

/** @type import("./types").ReduxDeckState **/
const initialState = {
    decks: [
        createDeck("Fruit vocab", [
            createCard("Apple", "A red fruit."),
            createCard("Banana", "A yellow fruit."),
            createCard("Orange", "An orange fruit.")
        ]),
        createDeck("Rocket science", [
            createCard("Vectors", "starts with V"),
            createCard("Rocket", "starts with S")
        ]),
    ]
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
        const { name, cards } = action.payload;

        return {
            ...state,
            decks: [ ...state.decks, createDeck(name, cards) ]
        }
      }

      case DELETE_DECK: {
        return {
          ...state,
          decks: state.decks.filter(deck => deck.uuid !== action.payload)
        }
      }

      case RENAME_DECK: {
        const { deckUuid, newName } = action.payload;
        return {
          ...state,
          decks: state.decks.map(deck => ({
            ...deck,
            name: deck.uuid === deckUuid ? newName : deck.name,
          }))
        }
      }

      case ADD_CARD: {
        const { deckUuid, card } = action.payload;
  
        return {
          ...state,
          decks: state.decks.map((deck) =>
            deck.uuid === deckUuid
              ? {
                  ...deck,
                  cards: [...(deck.cards || []), card] 
                }
              : deck
          ),
        };
      }

      case DELETE_CARD: {
        const { deckUuid, cardUuid } = action.payload;
        return {
          ...state,
          decks: state.decks.map(deck =>
            deck.uuid === deckUuid
              ? { 
                  ...deck, 
                  cards: deck.cards.filter(card => card.uuid && card.uuid !== cardUuid) 
                }
              : deck
          ),
        };
      }

      case UPDATE_CARD: {
        const { deckUuid, updatedCard } = action.payload;
        return {
          ...state,
          decks: state.decks.map((deck) =>
            deck.uuid === deckUuid
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

      default:
        return state;
  };
}
  

export default deckReducer;

import { ADD_DECK, ADD_CARD, DELETE_CARD, ADD_EMPTY_DECK, UPDATE_CARD } from "./actions";
import { createCard, createDeck } from "./helper";

/** @type import("./types").ReduxDeckState **/
const initialState = {
    decks: [
        createDeck("Fruit vocab", [
            createCard("Apple", "A red fruit."),
            createCard("Banana", "A yellow fruit."),
            createCard("Orange", { text: "A yellow fruit.", imageUrl: './assets/orange.jpeg' })
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

      default:
        return state;
  };
}
  

export default deckReducer;

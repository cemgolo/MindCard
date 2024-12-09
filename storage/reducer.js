import { ADD_DECK, ADD_EMPTY_DECK, UPDATE_CARD } from "./actions";
import { createCard, createDeck } from "./helper";

/** @type import("./types").ReduxDeckState **/
const initialState = {
    decks: [
        createDeck("Fruit vocab", [
            createCard("Apple", "A red fruit."),
            createCard("Banana", "A yellow fruit.")
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
            return {
                ...state,
                decks: [ ...state.decks, createDeck(action.payload) ]
            }
        }

        case UPDATE_CARD: {
            return {
                ...state,
                decks: state.decks.map(deck => ({
                    ...deck,
                    cards: deck.cards.map(card =>
                        card.uuid === action.payload.uuid ? action.payload : card
                    )
                }))
            }
        }

        default:
            return state;
    }
}

export default deckReducer;

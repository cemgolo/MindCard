import { State } from "ts-fsrs";
import { ADD_DECK } from "./actions";
import { createCard } from "./helper";

/** @type import("./types").FlashCardDeck **/
const defaultDeckOptions = {
    maxCardsEverySession: {
        [State.New]:        5,
        [State.Learning]:   Infinity,
        [State.Review]:     20,
        [State.Relearning]: Infinity
    }
};

/** @type import("./types").ReduxDeckState **/
const initialState = {
    decks: [
        {
            ...defaultDeckOptions,
            name: 'Fruit vocab',
            cards: [
                createCard("Apple", "A red fruit."),
                createCard("Banana", "A yellow fruit."),
            ]
        },
        {
            ...defaultDeckOptions,
            name: 'Rocket science',
            cards: [
                createCard("Vectors", "starts with V"),
                createCard("Rocket", "starts with S"),
            ]
        }
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
        default:
            return state;
    }
}

export default deckReducer;

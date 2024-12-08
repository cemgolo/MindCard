import { ADD_DECK } from "./actions";
import { createCard } from "./helper";
import uuid from 'react-native-uuid';

/** @type import("./types").ReduxDeckState **/
const initialState = {
    decks: [
        {
            id: uuid.v4(),
            name: 'Fruit vocab',
            cardsPerRound: 10,
            cards: [
                createCard("Apple", "A red fruit."),
                createCard("Banana", "A yellow fruit."),
            ]
        },
        {
            id: uuid.v4(),
            name: 'Rocket science',
            cardsPerRound: 10,
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

import { ADD_DECK } from "./actions";

const initialState = {
    decks: [
        {
            name: 'Fruit vocab',
            totalCards: 50,
            cardsPerRound: 10,
            performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
        },
        {
            name: 'Rocket science',
            totalCards: 80,
            cardsPerRound: 10,
            performance: { seen: 40, learned: 30, failed: 10, toReview: 0 },
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

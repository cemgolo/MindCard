import { ADD_DECK } from "./actions";

const initialState = {
    decks: [
        {
            name: 'Fruit vocab',
            totalCards: 50,
            cardsPerRound: 10,
            performance: { seen: 30, learned: 20, failed: 5, toReview: 5 },
            cards: [
                { front: 'Apple', back: 'A red fruit' },
                { front: 'Banana', back: 'A yellow fruit' },
            ]
        },
        {
            name: 'Rocket science',
            totalCards: 80,
            cardsPerRound: 10,
            performance: { seen: 40, learned: 30, failed: 10, toReview: 0 },
            cards: [
                { front: 'Vectors', back: 'starts with V' },
                { front: 'Rocket', back: 'starts with S' },
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

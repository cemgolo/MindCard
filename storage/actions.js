export const ADD_DECK = "ADD_DECK";
export const ADD_EMPTY_DECK = "ADD_EMPTY_DECK";
export const UPDATE_CARD = "UPDATE_CARD";

export const addDeck = deck => ({
    type: ADD_DECK,
    payload: deck
});

export const addEmptyDeck = name => ({
    type: ADD_EMPTY_DECK,
    payload: name
});

export const updateCard = card => ({
    type: UPDATE_CARD,
    payload: card
});

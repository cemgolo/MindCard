export const ADD_DECK = "ADD_DECK";
export const ADD_EMPTY_DECK = "ADD_EMPTY_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const DELETE_DECK = "DELETE_DECK";

export const addDeck = (deck) => ({
    type: ADD_DECK,
    payload: deck,
});

export const addEmptyDeck = name => ({
    type: ADD_EMPTY_DECK,
    payload: name
});

export const addCard = (deckName, card) => ({
    type: ADD_CARD,
    payload: { deckName, card },
});

export const deleteCard = (deckName, cardId) => ({
    type: DELETE_CARD,
    payload: { deckName, cardId },
});

export const updateCard = card => ({
    type: UPDATE_CARD,
    payload: card
});

export const deleteDeck = (deckName) => ({
    type: DELETE_DECK,
    payload: deckName
})

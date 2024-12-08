export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const addDeck = (deck) => ({
    type: ADD_DECK,
    payload: deck,
});

export const addCard = (deckName, card) => ({
    type: ADD_CARD,
    payload: { deckName, card },
});

export const deleteCard = (deckName, cardId) => ({
    type: DELETE_CARD,
    payload: { deckName, cardId },
});

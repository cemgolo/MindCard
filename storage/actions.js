export const ADD_DECK = "ADD_DECK";
export const ADD_EMPTY_DECK = "ADD_EMPTY_DECK";
export const RENAME_DECK = "RENAME_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";

export const addDeck = (deck) => ({
    type: ADD_DECK,
    payload: deck
});

export const addEmptyDeck = (name, cards) => ({
    type: ADD_EMPTY_DECK,
    payload: { name, cards }
});

export const renameDeck = (deckUuid, newName) => ({
    type: RENAME_DECK,
    payload: { deckUuid, newName }
});

export const deleteDeck = (deckUuid) => ({
    type: DELETE_DECK,
    payload: deckUuid
});

export const addCard = (deckUuid, card) => ({
    type: ADD_CARD,
    payload: { deckUuid, card }
});

export const deleteCard = (deckUuid, cardUuid) => ({
    type: DELETE_CARD,
    payload: { deckUuid, cardUuid }
});

export const updateCard = (deckUuid, updatedCard) => ({
    type: UPDATE_CARD,
    payload: { deckUuid, updatedCard }
});

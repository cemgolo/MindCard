import { createEmptyCard, State } from "ts-fsrs";
import { FlashCard, FlashCardDeck, FlashCardSide } from "./types";
import uuid from "react-native-uuid";

function createCard(
    front: FlashCardSide | string,
    back: FlashCardSide | string
): FlashCard {
    return {
        ...createEmptyCard(),
        uuid: uuid.v4(),
        content: {
            front: typeof front === "string" ? { text: front } : front,
            back: typeof back === "string" ? { text: back } : back,
        }
    }
}

function createDeck(name: string, cards: FlashCard[] = []): FlashCardDeck {
    return {
        name: name,
        maxCardsEverySession: {
            [State.New]:        5,
            [State.Learning]:   Infinity,
            [State.Review]:     20,
            [State.Relearning]: Infinity
        },
        cards: cards
    };
}

function isDue(card: FlashCard): boolean {
    const dueDate = typeof card.due === "string" ? Date.parse(card.due) : card.due;
    return dueDate <= new Date();
}

export { createCard, createDeck, isDue }

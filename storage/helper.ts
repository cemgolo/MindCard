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
        cards: cards,
        lastSessionDate: new Date(),
        newCardsPerDay: 5,
        newCardsSeenToday: 0,
    };
}

function isDue(card: FlashCard, fromDate?: Date): boolean {
    const dueDate = typeof card.due === "string" ? Date.parse(card.due) : card.due;
    return card.state === State.Learning || dueDate <= (fromDate ?? new Date());
}

export { createCard, createDeck, isDue }

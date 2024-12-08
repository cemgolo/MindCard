import { createEmptyCard, State } from "ts-fsrs";
import { FlashCard, FlashCardSide } from "./types";

function createCard(
    front: FlashCardSide | string,
    back: FlashCardSide | string
): FlashCard {
    return {
        ...createEmptyCard(),
        content: {
            front: typeof front === "string" ? { text: front } : front,
            back: typeof back === "string" ? { text: back } : back,
        }
    }
}

function isDue(card: FlashCard) {
    const dueDate = typeof card.due === "string" ? Date.parse(card.due) : card.due;
    return dueDate <= new Date();
}

export { createCard, isDue }

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

export { createCard }

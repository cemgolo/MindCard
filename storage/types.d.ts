import type { Card, State } from "ts-fsrs"

// https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]
// ---

type FlashCardSide = RequireAtLeastOne<{
    text: string;
    imageUrl: string;
    audioUrl: string;
}>

interface FlashCard extends Card {
    uuid: string;
    content: {
        front: FlashCardSide;
        back: FlashCardSide;
    }
}

interface FlashCardDeck {
    name: string;
    cards: FlashCard[];
    lastSessionDate: Date;
    newCardsPerDay: number;
    newCardsSeenToday: number;
}

interface ReduxDeckState {
    decks: FlashCardDeck[];
}

export { FlashCardSide, FlashCard, FlashCardDeck, ReduxDeckState }

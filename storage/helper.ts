import { createEmptyCard, Rating, State } from "ts-fsrs";
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

function generateSessionCards(deck: FlashCardDeck, fromDate: Date) {
    let newCardCount = 0;

    return deck.cards
      .filter(card => {
        if (card.state === State.New) {
          if (newCardCount < deck.newCardsPerDay - deck.newCardsSeenToday) {
            newCardCount++;
            return true;
          } else {
            return false;
          }
        } else {
          return isDue(card, fromDate)
        }
      })
      .reduce((obj: {[key: number]: FlashCard[]}, card) => {
        if (!(card.state in obj)) obj[card.state] = [];
        obj[card.state].push(card);
        return obj;
      }, {});
}

const cardReviewRatings = [
    { label: 'Fail', action: Rating.Again, color: '#ff6666' },
    { label: 'Slow', action: Rating.Hard, color: '#ffd966' },
    { label: 'Average', action: Rating.Good, color: '#00bbff' },
    { label: 'Fast', action: Rating.Easy, color: '#66cc66' }
];

const cardStateColors = {
    [State.New]: "blue",
    [State.Learning]: "green",
    [State.Review]: "yellow",
    [State.Relearning]: "red"
};

export { createCard, createDeck, isDue, generateSessionCards, cardReviewRatings, cardStateColors }

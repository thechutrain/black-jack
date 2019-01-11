import { IDeck } from '.';
import { Card, ALL_CARD_VALUES, ALL_SUITS } from '../card';

export class GameDeck implements IDeck {
  public cards: Card[];
  constructor(cards: Card[]) {
    this.cards = cards;
  }

  public static CREATE_52(): GameDeck {
    const createdCards: Card[] = [];
    for (const card of ALL_CARD_VALUES) {
      for (const suit of ALL_SUITS) {
        createdCards.push(new Card(card, suit));
      }
    }

    return new GameDeck(createdCards);
  }

  public draw(): Card {
    if (!this.cards.length) {
      throw new Error('No more cards!');
    }

    return this.cards.pop() as Card;
  }

  public shuffle(): void {
    this.cards.forEach((card, index) => {
      // tslint:disable-next-line:insecure-random
      const randIndex = Math.floor(Math.random() * this.cards.length);
      this.cards[index] = this.cards[randIndex];
      this.cards[randIndex] = card;
    });
  }
}

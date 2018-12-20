import { IDeck } from './deck';
import { Card } from './card';

export class OrderedDeck implements IDeck {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }
  public draw(): Card {
    return this.cards.pop() as Card;
  }

  public shuffle(): void {
    // Does nothing
  }
}

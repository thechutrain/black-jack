import { Card } from './card';

export class PlayerState {
  public playerCards: Card[];

  constructor(cards: Card[]) {
    this.playerCards = cards;
  }

  public myCards(): Card[] {
    return [];
  }
}

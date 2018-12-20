import { Card, CardValue, Suit, ALL_CARD_VALUES, ALL_SUITS } from './card';

export interface IDeck {
  draw(): Card;
  shuffle(): void;
}

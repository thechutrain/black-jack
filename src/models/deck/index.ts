import { Card, CardValue, Suit, ALL_CARD_VALUES, ALL_SUITS } from '../card';

export { GameDeck } from './gamedeck';
export { OrderedDeck } from './ordereddeck';

export interface IDeck {
  draw(): Card;
  shuffle(): void;
}

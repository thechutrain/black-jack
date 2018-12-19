export enum CardValue {
  ACE = 'ACE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
}

export const ALL_CARD_VALUES: CardValue[] = [
  CardValue.ACE,
  CardValue.TWO,
  CardValue.THREE,
  CardValue.FOUR,
  CardValue.FIVE,
  CardValue.SIX,
  CardValue.SEVEN,
  CardValue.EIGHT,
  CardValue.NINE,
  CardValue.TEN,
  CardValue.JACK,
  CardValue.QUEEN,
  CardValue.KING,
];

export enum Suit {
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  HEARTS = 'HEARTS',
  DIAMONDS = 'DIAMONDS',
}

export const ALL_SUITS: Suit[] = [
  Suit.SPADES,
  Suit.CLUBS,
  Suit.HEARTS,
  Suit.DIAMONDS,
];

export class Card {
  public value: CardValue;
  public suit: Suit;

  constructor(value: CardValue, suit: Suit) {
    this.value = value;
    this.suit = suit;
  }
}

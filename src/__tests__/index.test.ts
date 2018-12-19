// import Game from '../';

import { Deck } from '../deck';
import { handValue } from '../handvalue';
import { Card, CardValue, Suit } from '../card';

it(`it should have a 'Game' model `, () => {
  // const game = new Game();
  // expect(game).toBeDefined();
});

it('hand value normal', () => {
  expect(handValue([new Card(CardValue.THREE, Suit.SPADES)])).toBe(3);
});

it('hand with no aces', () => {
  expect(
    handValue([
      new Card(CardValue.THREE, Suit.SPADES),
      new Card(CardValue.KING, Suit.SPADES),
      new Card(CardValue.TEN, Suit.SPADES),
    ]),
  ).toBe(23);
});

it('hand with 1 ace', () => {
  expect(
    handValue([
      new Card(CardValue.ACE, Suit.SPADES),
      new Card(CardValue.KING, Suit.SPADES),
      new Card(CardValue.TEN, Suit.SPADES),
    ]),
  ).toBe(21);
});

it('hand with 1 ace as 11', () => {
  expect(
    handValue([
      new Card(CardValue.ACE, Suit.SPADES),
      new Card(CardValue.KING, Suit.SPADES),
    ]),
  ).toBe(21);
});

it('hand with four aces', () => {
  expect(
    handValue([
      new Card(CardValue.ACE, Suit.SPADES),
      new Card(CardValue.ACE, Suit.SPADES),
      new Card(CardValue.ACE, Suit.SPADES),
      new Card(CardValue.ACE, Suit.SPADES),
    ]),
  ).toBe(14);
});

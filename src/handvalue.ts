import { Card, CardValue } from './card';

export function handValue(hand: Card[]): number {
  const numAces = hand.filter(c => c.value === CardValue.ACE).length;
  const nonAceValue = hand
    .filter(c => c.value !== CardValue.ACE)
    .map(cardValue)
    .reduce((a, b) => a + b, 0);
  let value = nonAceValue + numAces * 11;
  let numOneAces = 0;
  while (value > 21 && numOneAces < numAces) {
    value -= 10;
    numOneAces += 1;
  }

  return value;
}

function cardValue(card: Card): number {
  switch (card.value) {
    case CardValue.ACE:
      throw new Error("Can't handle ACES here.");
    case CardValue.TWO:
      return 2;
    case CardValue.THREE:
      return 3;
    case CardValue.FOUR:
      return 4;
    case CardValue.FIVE:
      return 5;
    case CardValue.SIX:
      return 6;
    case CardValue.SEVEN:
      return 7;
    case CardValue.EIGHT:
      return 8;
    case CardValue.NINE:
      return 9;
    case CardValue.TEN:
    case CardValue.JACK:
    case CardValue.QUEEN:
    case CardValue.KING:
      return 10;
    default:
      throw new Error('Unknown card value.');
  }
}

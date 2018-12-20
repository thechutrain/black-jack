import { IPlayer } from './player';
import { HiddenCard } from './hiddencard';
import { Card, CardValue } from './card';
import { HandState } from './handstate';

export class Hand {
  public player: IPlayer;
  public cards: Card[];
  public handState: HandState;

  private constructor(player: IPlayer, cards: Card[], handState: HandState) {
    this.player = player;
    this.cards = cards;
    this.handState = handState;
  }

  public static EMPTY_FOR_PLAYER(player: IPlayer): Hand {
    return new Hand(player, [], HandState.UNKNOWN);
  }

  public withHandState(handState: HandState) {
    return new Hand(this.player, this.cards.concat(), handState);
  }

  public addCard(card: Card): Hand {
    const newHandState =
      this.getValue() > 21 ? HandState.BUSTED : HandState.UNKNOWN;
    const newCards = this.cards.concat(card);

    return new Hand(this.player, newCards, newHandState);
  }

  public revealCards(): Hand {
    return new Hand(
      this.player,
      this.cards.map(c => c.flipFaceUp()),
      this.handState,
    );
  }

  public getValue(): number {
    return this.computeHandValue(this.cards);
  }

  private computeHandValue(hand: Card[]): number {
    const numAces = hand.filter(c => c.value === CardValue.ACE).length;
    const nonAceValue = hand
      .filter(c => c.value !== CardValue.ACE)
      .map(this.cardValue)
      .reduce((a, b) => a + b, 0);
    let value = nonAceValue + numAces * 11;
    let numOneAces = 0;
    while (value > 21 && numOneAces < numAces) {
      value -= 10;
      numOneAces += 1;
    }

    return value;
  }

  private cardValue(card: Card): number {
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
    //   public toPlayerHand() {
    // 	  return new Hand(this.);
    //   }
  }
}

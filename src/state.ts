import { PlayerState } from './playerstate';
import { IDeck } from './deck';
import { IPlayer } from './player';
import { Card } from './card';
import { Action } from './action';
import { Hand } from './hand';
import { HandState } from './handstate';
import { Dealer } from './dealer';
import { prependListener } from 'cluster';
import { SlowDelegatingPlayer } from './slowdelegatingplayer';

export class State {
  public playerHands: Hand[];
  //public players: Map<IPlayer, Hand>;
  //private handStates: Map<IPlayer, HandState>;
  private dealerHand: Hand;

  private constructor(playerHands: Hand[], dealerHand: Hand) {
    this.playerHands = playerHands;
    this.dealerHand = dealerHand;
  }

  public static FROM_PLAYER_LIST(players: IPlayer[]) {
    // const playerHands = [];
    // const handStates = new Map();
    const playerHands = players.map(player => Hand.EMPTY_FOR_PLAYER(player));
    const dealer = new SlowDelegatingPlayer(new Dealer(), 1000);
    const dealerHand = Hand.EMPTY_FOR_PLAYER(dealer);

    return new State(playerHands, dealerHand);
  }

  public applyAction(deck: IDeck, playerHand: Hand, action: Action): State {
    switch (action) {
      case Action.HIT:
        const newHand = playerHand.addCard(deck.draw().flipFaceUp());
        const newPlayerHand = this.playerHands.map(hand => {
          if (hand.player === playerHand.player) {
            return newHand;
          } else {
            return hand;
          }
        });

        return new State(newPlayerHand, this.dealerHand);
      case Action.STAND:
        return this;
      default:
        throw new Error('Unknown action');
    }
  }

  public dealCards(deck: IDeck): State {
    // Don't deal the dealer twice!
    return new State(
      this.playerHands.map(hand => this.dealTwoCards(deck, hand)),
      this.dealTwoCards(deck, this.dealerHand),
    );
  }

  public toEndGameState(): State {
    const newHands = this.playerHands.map(hand => {
      if (hand.player === this.dealerHand.player) {
        return hand;
      }
      if (hand.getValue() > 21) {
        hand.handState = HandState.BUSTED;

        return hand;
      }

      const newState =
        hand.getValue() > this.dealerHand.getValue()
          ? HandState.WON
          : HandState.LOST_TO_DEALER;

      return hand.withHandState(newState);
    });

    return new State(newHands, this.dealerHand);
  }

  public toPlayerState(currHand: Hand): PlayerState {
    const allOtherHands = this.playerHands.filter(h => h !== currHand);

    return new PlayerState(currHand, allOtherHands);
  }

  private dealTwoCards(deck: IDeck, hand: Hand): Hand {
    return hand.addCard(deck.draw()).addCard(deck.draw().flipFaceUp());
  }
}

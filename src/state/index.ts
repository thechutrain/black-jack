import { IDeck } from '../models/deck';
import { IPlayer, SlowDelegatingPlayer, Dealer } from '../models/player';
import { Hand, HandState } from '../models/hand';
// import { Card } from '../card';
import { Action } from '../action';
import { PlayerState } from './playerstate';
export { PlayerState } from './playerstate';
// export { HandState } from '../models/hand/handstate';
// import { prependListener } from 'cluster';

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

  public applyAction(deck: IDeck, player: IPlayer, action: Action): State {
    switch (action) {
      case Action.HIT:
        const newPlayerHand = this.playerHands.map(hand => {
          return hand.player === player
            ? hand.addCard(deck.draw().flipFaceUp())
            : hand;
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
      if (hand.handState === HandState.BUSTED) {
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

  public toPlayerState(player: IPlayer): PlayerState {
    const allOtherHands = this.playerHands.filter(h => h.player !== player);
    const currHand = this.playerHands.find(h => h.player === player);
    if (!currHand) {
      throw new Error('Unknown player!');
    }

    return new PlayerState(currHand, allOtherHands);
  }

  public isGameOver(): boolean {
    let gameOver = true;
    this.playerHands.forEach((playerHand: Hand) => {
      if (playerHand.handState === HandState.UNKNOWN) {
        gameOver = false;
      }
    });

    return gameOver;
  }
  private dealTwoCards(deck: IDeck, hand: Hand): Hand {
    return hand.addCard(deck.draw()).addCard(deck.draw().flipFaceUp());
  }
}

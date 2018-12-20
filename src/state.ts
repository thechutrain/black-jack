import { PlayerState } from './playerstate';
import { IDeck } from './deck';
import { IPlayer } from './player';
import { Card } from './card';
import { Action } from './action';
import { handValue } from './handvalue';
import { HandState } from './handstate';
import { Dealer } from './dealer';
import { prependListener } from 'cluster';
import { SlowDelegatingPlayer } from './slowdelegatingplayer';

export class State {
  public players: Map<IPlayer, Card[]>;
  private handStates: Map<IPlayer, HandState>;
  private dealer: IPlayer;

  private constructor(
    players: Map<IPlayer, Card[]>,
    handStates: Map<IPlayer, HandState>,
    dealer: IPlayer,
  ) {
    this.players = players;
    this.handStates = handStates;
    this.dealer = dealer;
  }

  public static FROM_PLAYER_LIST(players: IPlayer[]) {
    const playersMap = new Map();
    const handStates = new Map();
    players.forEach(player => {
      playersMap.set(player, []);
      handStates.set(player, HandState.UNKNOWN);
    });
    const dealer = new SlowDelegatingPlayer(new Dealer(), 1000);
    playersMap.set(dealer, []);
    handStates.set(dealer, HandState.UNKNOWN);

    return new State(playersMap, handStates, dealer);
  }

  public static APPLY_ACTION(
    deck: IDeck,
    prevState: State,
    player: IPlayer,
    action: Action,
  ): State {
    switch (action) {
      case Action.HIT:
        // console.log('HIT');
        const card = deck.draw();
        // Probably need to deep copy map.
        const players = new Map(prevState.players);
        const playerHand = players.get(player) as Card[];
        playerHand.push(card);

        const newHandStates = new Map(prevState.handStates);
        if (handValue(playerHand) > 21) {
          newHandStates.set(player, HandState.BUSTED);
        }

        return new State(players, newHandStates, prevState.dealer);
      case Action.STAND:
        return prevState;
      default:
        throw new Error('Unknown action');
    }
  }

  public toEndGameState(): State {
    const players = new Map(this.players);
    const handStates = new Map(this.handStates);
    const dealerHandSum = this.getDealerHandSum();
    players.forEach((cards, player) => {
      if (player === this.dealer) {
        return;
      }
      if (this.getHandState(player) === HandState.BUSTED) {
        return;
      }
      const newState =
        this.getPlayerHandSum(player) > dealerHandSum
          ? HandState.WON
          : HandState.LOST_TO_DEALER;
      handStates.set(player, newState);
    });

    return new State(players, handStates, this.dealer);
  }

  public toPlayerState(player: IPlayer): PlayerState {
    const playerCards = this.players.get(player) as Card[];

    return new PlayerState(playerCards);
  }

  public getHandState(player: IPlayer): HandState {
    const handState = this.handStates.get(player);
    if (!handState) {
      throw new Error('Player unknown.');
    }

    return handState;
  }

  public getPlayerHandSum(player: IPlayer) {
    return handValue(this.getPlayerHand(player));
  }

  public totalCardsPlayed(): number {
    let sum = 0;
    this.players.forEach((cards, player) => {
      sum += cards.length;
    });

    return sum;
  }

  public getDealerHandSum(): number {
    return this.getPlayerHandSum(this.dealer);
  }

  private getPlayerHand(player: IPlayer): Card[] {
    const hand: Card[] | undefined = this.players.get(player);
    if (!hand) {
      throw new Error('Player not found!');
    }

    return hand;
  }
}

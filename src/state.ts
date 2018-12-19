import { PlayerState } from './playerstate';
import { Deck } from './deck';
import { IPlayer } from './player';
import { Card } from './card';
import { Action } from './action';

export class State {
  public players: Map<IPlayer, Card[]>;

  private constructor(players: Map<IPlayer, Card[]>) {
    this.players = players;
  }

  public static FROM_PLAYER_LIST(players: IPlayer[]) {
    const playersMap = new Map();
    players.forEach(player => {
      playersMap.set(player, []);
    });

    return new State(playersMap);
  }

  public static APPLY_ACTION(
    deck: Deck,
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

        return new State(players);
      case Action.STAND:
        return prevState;
      default:
        throw new Error('Unknown action');
    }
  }

  public toPlayerState(player: IPlayer): PlayerState {
    const playerCards = this.players.get(player) as Card[];

    return new PlayerState(playerCards);
  }

  public totalCardsPlayed(): number {
    let sum = 0;
    this.players.forEach((cards, player) => {
      sum += cards.length;
    });

    return sum;
  }
}

import { IPlayer } from './player';
import { PlayerState } from './playerstate';
import { Action } from './action';

export class Dealer implements IPlayer {
  public name(): string {
    return 'DEALER';
  }

  public act(playerState: PlayerState): Promise<Action> {
    return new Promise<Action>((resolve, reject) => {
      if (playerState.playerCards.getValue() >= 17) {
        resolve(Action.STAND);
      } else {
        resolve(Action.HIT);
      }
    });
  }
}

import { IPlayer } from './player';
import { PlayerState } from './playerstate';
import { Action } from './action';
import { handValue } from './handvalue';

export class Dealer implements IPlayer {
  public name(): string {
    return 'DEALER';
  }

  public act(playerState: PlayerState): Promise<Action> {
    return new Promise<Action>((resolve, reject) => {
      if (handValue(playerState.myCards()) >= 17) {
        resolve(Action.STAND);
      } else {
        resolve(Action.HIT);
      }
    });
  }
}

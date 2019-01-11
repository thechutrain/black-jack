import { IPlayer } from '.';
import { PlayerState } from '../../state';
import { Action } from '../../action';

export class SlowDelegatingPlayer implements IPlayer {
  public delay: number;
  public player: IPlayer;

  constructor(player: IPlayer, delay: number) {
    this.delay = delay;
    this.player = player;
  }

  public name(): string {
    return `Slow Delegate Player: ${this.player.name()}`;
  }

  public act(playerState: PlayerState): Promise<Action> {
    return this.player.act(playerState).then(action => {
      return new Promise<Action>(resolve => {
        setTimeout(() => {
          resolve(action);
        }, this.delay);
      });
    });
  }
}

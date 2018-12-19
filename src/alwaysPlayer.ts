import { IPlayer } from './player';
import { Action } from './action';
import { PlayerState } from './playerstate';

export class AlwaysPlayer implements IPlayer {
  private playerAction: Action;

  constructor(action: Action) {
    this.playerAction = action;
  }

  public act(): Promise<Action> {
    return Promise.resolve(this.playerAction);
  }
}

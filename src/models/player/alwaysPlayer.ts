import { IPlayer } from '.';
import { Action } from '../../action';

export class AlwaysPlayer implements IPlayer {
  private playerAction: Action;

  constructor(action: Action) {
    this.playerAction = action;
  }

  public act(): Promise<Action> {
    return Promise.resolve(this.playerAction);
  }

  public name(): string {
    return `Always ${this.playerAction}`;
  }
}

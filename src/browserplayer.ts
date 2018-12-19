import { IPlayer } from './player';
import { PlayerState } from './playerstate';
import { Action } from './action';

export class BrowserPlayer implements IPlayer {
  private hitButton: HTMLElement;
  private standButton: HTMLElement;
  private myTurnResolveFn: ((action: Action) => void) | null;

  constructor() {
    const hitButton = document.getElementById('hit');
    const standButton = document.getElementById('stand');
    if (!hitButton || !standButton) {
      throw new Error(':(');
    }
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.myTurnResolveFn = null;

    hitButton.onclick = () => this.onHitClick_();
    standButton.onclick = () => this.onStandClick_();
  }

  public act(playerState: PlayerState): Promise<Action> {
    // tslint:disable-next-line:promise-must-complete
    return new Promise<Action>((resolve, reject) => {
      this.myTurnResolveFn = resolve;
    });
  }

  private onHitClick_(): void {
    if (this.myTurnResolveFn) {
      this.myTurnResolveFn(Action.HIT);
      this.myTurnResolveFn = null;
    }
  }

  private onStandClick_(): void {
    if (this.myTurnResolveFn) {
      this.myTurnResolveFn(Action.STAND);
      this.myTurnResolveFn = null;
    }
  }
}

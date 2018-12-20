import { IPlayer } from './player';
import { PlayerState } from './playerstate';
import { Action } from './action';

export class BrowserPlayer implements IPlayer {
  private playerName: string;
  private hitButton: HTMLElement;
  private standButton: HTMLElement;
  private myTurnResolveFn: ((action: Action) => void) | null;

  constructor(name: string) {
    const hitButton = document.getElementById('hit');
    const standButton = document.getElementById('stand');
    if (!hitButton || !standButton) {
      throw new Error(':(');
    }
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.myTurnResolveFn = null;
    this.playerName = name;
  }

  public name(): string {
    return this.playerName;
  }

  public act(playerState: PlayerState): Promise<Action> {
    this.hitButton.classList.remove('hidden');
    this.standButton.classList.remove('hidden');
    this.hitButton.onclick = () => this.onHitClick_();
    this.standButton.onclick = () => this.onStandClick_();

    // tslint:disable-next-line:promise-must-complete
    return new Promise<Action>((resolve, reject) => {
      this.myTurnResolveFn = resolve;
    });
  }

  private onHitClick_(): void {
    if (this.myTurnResolveFn) {
      this.myTurnResolveFn(Action.HIT);
      this.myTurnResolveFn = null;
      this.hitButton.classList.add('hidden');
      this.standButton.classList.add('hidden');
    }
  }

  private onStandClick_(): void {
    if (this.myTurnResolveFn) {
      this.myTurnResolveFn(Action.STAND);
      this.myTurnResolveFn = null;
      this.hitButton.classList.add('hidden');
      this.standButton.classList.add('hidden');
    }
  }
}

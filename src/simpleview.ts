import { Card } from './card';
import { IPlayer } from './player';
import { IView } from './view';
import { State } from './state';

export class SimpleView implements IView {
  public refresh(state: State): void {
    const stateEl = document.getElementById('state');
    if (stateEl) {
      stateEl.innerText = '';
      state.playerHands.forEach(hand => {
        const newChildEl = document.createElement('div');
        newChildEl.innerText = `Player '${hand.player.name()}': ${JSON.stringify(
          hand.cards,
        )}, ${hand.handState}`;
        stateEl.append(newChildEl);
      });
    }
  }
}

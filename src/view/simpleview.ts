import { Card } from '../models/card';
// import { IPlayer } from '../player';
import { IView } from './index';
import { State } from '../state';

export class SimpleView implements IView {
  public refresh(state: State): void {
    const stateEl = document.getElementById('state');
    const gameStatusEl = document.getElementById('game-status');
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

    if (state.isGameOver() && gameStatusEl) {
      gameStatusEl.innerText = 'Game Over!';
    }
  }
}

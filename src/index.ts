import { Game } from './game';
import { BrowserPlayer } from './browserplayer';
import { State } from './state';
import { IView } from './view';

function main() {
  const game = new Game(
    State.FROM_PLAYER_LIST([new BrowserPlayer()]),
    new SimpleView(),
  );
  game.play();
}

class SimpleView implements IView {
  public refresh(state: State): void {
    const stateEl = document.getElementById('state');
    if (stateEl) {
      state.players.forEach((cards, player) => {
        const newChildEl = document.createElement('div');
        newChildEl.innerText = JSON.stringify(cards);
        stateEl.append(newChildEl);
      });
    }
  }
}

window.onload = main;

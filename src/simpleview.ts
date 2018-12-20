import { Card } from './card';
import { IPlayer } from './player';
import { IView } from './view';
import { State } from './state';

export class SimpleView implements IView {
  public refresh(state: State): void {
    const stateEl = document.getElementById('state');
    if (stateEl) {
      stateEl.innerText = '';
      state.players.forEach((cards: Card[], player: IPlayer) => {
        const newChildEl = document.createElement('div');
        newChildEl.innerText = `Player '${player.name()}': ${JSON.stringify(
          cards,
        )}, ${state.getHandState(player)}`;
        stateEl.append(newChildEl);
      });
    }
  }
}

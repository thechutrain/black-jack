import { Game } from './game';
import {
  BrowserPlayer,
  AlwaysPlayer,
  SlowDelegatingPlayer,
} from './models/player';
import { State } from './state';
import { SimpleView } from './view/simpleview';
import { Action } from './action';
import { GameDeck } from './models/deck';

function main() {
  const game = new Game(
    GameDeck.CREATE_52(),
    State.FROM_PLAYER_LIST([
      new BrowserPlayer('BrowserPlayer 1'),
      new SlowDelegatingPlayer(new AlwaysPlayer(Action.HIT), 1000),
      // new BrowserPlayer('BrowserPlayer 2'),
    ]),
    new SimpleView(),
  );
  game.play();
}

window.onload = main;

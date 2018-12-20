import { Game } from './game';
import { BrowserPlayer } from './browserplayer';
import { State } from './state';
import { SimpleView } from './simpleview';
import { AlwaysPlayer } from './alwaysPlayer';
import { Action } from './action';
import { SlowDelegatingPlayer } from './slowdelegatingplayer';
import { GameDeck } from './gamedeck';

function main() {
  const game = new Game(
    GameDeck.CREATE_52(),
    State.FROM_PLAYER_LIST([
      // new SlowDelegatingPlayer(new AlwaysPlayer(Action.HIT), 1000),
      new BrowserPlayer('BrowserPlayer 1'),
      // new BrowserPlayer('BrowserPlayer 2'),
    ]),
    new SimpleView(),
  );
  game.play();
}

window.onload = main;

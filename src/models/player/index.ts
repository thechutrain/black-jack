import { Action } from '../../action';
import { PlayerState } from '../../state';

export interface IPlayer {
  name(): string;
  act(playerState: PlayerState): Promise<Action>;
}

export { AlwaysPlayer } from './alwaysPlayer';
export { BrowserPlayer } from './browserPlayer';
export { SlowDelegatingPlayer } from './slowdelegatingplayer';
export { Dealer } from './dealer';

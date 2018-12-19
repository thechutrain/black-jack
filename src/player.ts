import { Action } from './action';
import { PlayerState } from './playerstate';

export interface IPlayer {
  act(playerState: PlayerState): Promise<Action>;
}

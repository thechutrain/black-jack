import { Action } from './action';
import { PlayerState } from './playerstate';

export interface IPlayer {
  name(): string;
  act(playerState: PlayerState): Promise<Action>;
}

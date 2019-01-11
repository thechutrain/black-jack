import { State } from '../state';

export interface IView {
  refresh(state: State): void;
}

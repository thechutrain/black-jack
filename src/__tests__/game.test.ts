import { Game } from '../game';
import { State } from '../state';
import { AlwaysPlayer } from '../alwaysPlayer';
import { Action } from '../action';
import { IView } from '../view';

const dumbyView: IView = {
  refresh: (state: State) => null,
};

it('should always be to play', () => {
  const game = new Game(
    State.FROM_PLAYER_LIST([new AlwaysPlayer(Action.STAND)]),
    dumbyView,
  );

  expect(game.state.totalCardsPlayed()).toBe(0);

  return game.play().then(() => {
    expect(game.state.totalCardsPlayed()).toBe(2);
  });
});

it('should always be to play', () => {
  const game = new Game(
    State.FROM_PLAYER_LIST([new AlwaysPlayer(Action.HIT)]),
    dumbyView,
  );

  expect(game.state.totalCardsPlayed()).toBe(0);

  return game.play().then(() => {
    expect(game.state.totalCardsPlayed()).toBeGreaterThan(2);
  });
});

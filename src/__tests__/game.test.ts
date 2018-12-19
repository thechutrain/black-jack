import { Game } from '../game';
import { State } from '../state';
import { AlwaysPlayer } from '../alwaysPlayer';
import { Action } from '../action';

// it('should be able to deal cards & take player hits', () => {
//   const game = new Game(
//     State.FROM_PLAYER_LIST([
//       new AlwaysPlayer(Action.HIT),
//       new AlwaysPlayer(),
//       new AlwaysPlayer(),
//     ]),
//   );

//   expect(game.state.totalCardsPlayed()).toBe(0);

//   return game.play().then(() => {
//     expect(game.state.totalCardsPlayed()).toBeGreaterThan(6);
//   });
// });

it('should always be to play', () => {
  const game = new Game(
    State.FROM_PLAYER_LIST([new AlwaysPlayer(Action.STAND)]),
  );

  expect(game.state.totalCardsPlayed()).toBe(0);

  return game.play().then(() => {
    expect(game.state.totalCardsPlayed()).toBe(2);
  });
});

it('should always be to play', () => {
  const game = new Game(State.FROM_PLAYER_LIST([new AlwaysPlayer(Action.HIT)]));

  expect(game.state.totalCardsPlayed()).toBe(0);

  return game.play().then(() => {
    expect(game.state.totalCardsPlayed()).toBeGreaterThan(2);
  });
});

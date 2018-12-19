import { AlwaysPlayer } from '../alwaysPlayer';
import { Action } from '../action';

it('should HIT', () => {
  const alwaysHit = new AlwaysPlayer(Action.HIT);

  return alwaysHit.act().then(act => {
    expect(act).toBe(Action.HIT);
  });
});

it('should STAND', () => {
  const alwaysStand = new AlwaysPlayer(Action.STAND);

  return alwaysStand.act().then(act => {
    expect(act).toBe(Action.STAND);
  });
});

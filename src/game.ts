import { Action } from './action';
import { Card } from './card';
import { State } from './state';
import { IPlayer } from './player';
import { handValue } from './handvalue';
import { PlayerState } from './playerstate';
import { IDeck } from './deck';
import { GameDeck } from './gamedeck';
import { IView } from './view';
import { debug } from 'util';

export class Game {
  public deck: IDeck;
  public state: State;
  public view: IView;

  constructor(deck: IDeck, state: State, view: IView) {
    this.state = state;
    this.deck = deck;
    this.view = view;
  }

  public play(): Promise<void> {
    this.deck.shuffle();

    // Deal the cards.
    this.state.players.forEach((cards, player) => {
      cards.push(this.deck.draw(), this.deck.draw());
    });
    this.view.refresh(this.state);

    // Make the turns.
    let promiseChain = Promise.resolve();
    for (const player of this.state.players.keys()) {
      promiseChain = promiseChain.then(() => this.doTurn(player));
    }

    return promiseChain;
  }

  private doTurn(player: IPlayer): Promise<void> {
    // console.log(handValue(this.state.players.get(player) as Card[]));

    if (handValue(this.state.players.get(player) as Card[]) > 21) {
      return Promise.resolve();
    }

    return player.act(this.state.toPlayerState(player)).then(action => {
      if (action === Action.STAND) {
        return Promise.resolve();
      }

      this.state = State.APPLY_ACTION(this.deck, this.state, player, action);
      this.view.refresh(this.state);

      return this.doTurn(player);
    });
  }
}

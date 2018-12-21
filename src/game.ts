import { Action } from './action';
import { Card } from './card';
import { State } from './state';
import { HandState } from './handstate';
import { IPlayer } from './player';
import { PlayerState } from './playerstate';
import { IDeck } from './deck';
import { GameDeck } from './gamedeck';
import { IView } from './view';
import { debug } from 'util';
import { Hand } from './hand';

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
    this.state = this.state.dealCards(this.deck);
    this.view.refresh(this.state);

    // Make the turns.
    let promiseChain = Promise.resolve();
    for (const hand of this.state.playerHands) {
      promiseChain = promiseChain.then(() => this.doTurn(hand.player));
    }

    promiseChain = promiseChain.then(() => {
      this.state = this.state.toEndGameState();
      this.view.refresh(this.state);
    });

    return promiseChain;
  }

  private doTurn(player: IPlayer): Promise<void> {
    return player.act(this.state.toPlayerState(player)).then(action => {
      if (action === Action.STAND) {
        return Promise.resolve();
      }

      this.state = this.state.applyAction(this.deck, player, action);
      this.view.refresh(this.state);

      return this.doTurn(player);
    });
  }
}

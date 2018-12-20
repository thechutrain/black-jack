import { Action } from './action';
import { Card } from './card';
import { State } from './state';
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
      promiseChain = promiseChain.then(() => this.doTurn(hand));
    }

    promiseChain = promiseChain.then(() => {
      this.state = this.state.toEndGameState();
      this.view.refresh(this.state);
    });

    return promiseChain;
  }

  private doTurn(hand: Hand): Promise<void> {
    // console.log(handValue(this.state.players.get(player) as Card[]));

    if (hand.getValue() > 21) {
      return Promise.resolve();
    }

    return hand.player.act(this.state.toPlayerState(hand)).then(action => {
      if (action === Action.STAND) {
        return Promise.resolve();
      }

      this.state = this.state.applyAction(this.deck, hand, action);
      this.view.refresh(this.state);

      return this.doTurn(hand);
    });
  }
}

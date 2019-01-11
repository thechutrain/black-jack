import { Action } from './action';
// import { Card } from './card';
import { State } from './state';
// import { HandState, PlayerState } from './state';
import { IPlayer } from './models/player';
import { IDeck } from './models/deck';
// import { GameDeck } from './gamedeck';
import { IView } from './view';
import { HandState } from './models/hand';
// import { debug } from 'util';
// import { Hand } from './hand';

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
    // const player = await player.act(this.state.toPlayerState(player));
    const isBusted =
      this.state.toPlayerState(player).playerCards.handState ===
      HandState.BUSTED;

    return isBusted
      ? Promise.resolve()
      : player.act(this.state.toPlayerState(player)).then(action => {
          if (action === Action.STAND) {
            return Promise.resolve();
          }

          this.state = this.state.applyAction(this.deck, player, action);
          this.view.refresh(this.state);

          return this.doTurn(player);
        });
  }
}

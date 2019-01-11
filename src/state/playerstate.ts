// import { Card } from './card';
// import { HiddenCard } from './hiddencard';
import { Hand } from '../models/hand';
// import { PlayerHand } from './playerHand';

export class PlayerState {
  public playerCards: Hand;
  public otherPlayerCards: Hand[];

  constructor(playerCards: Hand, otherPlayerCards: Hand[]) {
    this.playerCards = playerCards;
    this.otherPlayerCards = otherPlayerCards;
  }
}

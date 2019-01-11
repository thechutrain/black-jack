import { Card } from './';

export class HiddenCard {
  private facedownCard: Card;
  constructor(facedownCard: Card) {
    this.facedownCard = facedownCard;
  }
}

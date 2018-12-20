import { Card } from './card';

export class HiddenCard {
  private facedownCard: Card;
  constructor(facedownCard: Card) {
    this.facedownCard = facedownCard;
  }
}

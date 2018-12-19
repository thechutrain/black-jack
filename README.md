# Black Jack

### How the game works

- The goal is to get closer to 21
- There's one dealer
- There are n players

To win

- An individual player gets closest to 21 before the dealer without going over 21

Game mechanics

-

### Game Model

- Game (manage game state)
  - State (mutable)
    - Deck
    - Player[]
    - Deck
    - Dealer
- State
  - whose turn - what cards everyone has (including facedown cards) - update(Action): State or void - toPlayerState(): PlayerState
- PlayerState
  - only reveals face up cards
- Deck (a deck has 52 cards)
  - draw(): Card
  - shuffle(): void
- Card
  - value: string
  - suit: string
- Player
  - act(PlayerState): Action
- Action
  - Hit
  - Stand
- Dealer
- View (thing that renders on the page)
  - Game

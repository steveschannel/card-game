import { gameLogic } from 'game/use-cases/game-logic'

describe('appropriately handle deals and outcomes of the game', () => {
  let dealFive
  let hand
  let showOutcome
  let showControlScheme
  let canResume
  let remainingCardsInDeck
  let cardsInHand
  let result

  beforeEach(() => {
    hand = value => value
    showOutcome = value => value
    showControlScheme = value => value
    canResume = value => value
    remainingCardsInDeck = value => value
    cardsInHand = value => value
    result = value => value
  })
  it('should return a hand of 5 successfully', async () => {
    dealFive = {
      deck: [
        {
          id: '81',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '77',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '74',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '76',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '82',
          value: 'Ace',
          suit: 'S',
        },
      ],
      game: {
        id: '139',
        outcome: 'U',
      },
      outcome: 'No Victor',
      unplayedCount: 4,
      totalCount: 9,
    }
    const testResult = gameLogic(dealFive)
    expect(testResult).toEqual(true)
    expect(hand).toEqual(dealFive.deck)
    expect(canResume).toEqual(true)
    expect(remainingCardsInDeck).toEqual(dealFive.unplayedCount)
    expect(cardsInHand).toEqual(dealFive.totalCount - dealFive.unplayedCount)
  })
  it('should return a hand of 4 and Victory', async () => {
    dealFive = {
      deck: [
        {
          id: '81',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '77',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '74',
          value: 'Ace',
          suit: 'S',
        },
        {
          id: '76',
          value: 'Ace',
          suit: 'S',
        },
      ],
      game: {
        id: '139',
        outcome: 'W',
      },
      outcome: 'No Victor',
      unplayedCount: 0,
      totalCount: 9,
    }
    const testResult = gameLogic(dealFive)
    expect(testResult).toEqual(false)
    expect(hand).toEqual(dealFive.deck)
    expect(canResume).toEqual(false)
    expect(remainingCardsInDeck).toEqual(dealFive.unplayedCount)
    expect(cardsInHand).toEqual(dealFive.totalCount - dealFive.unplayedCount)
    expect(showControlScheme).toEqual(false)
    expect(result).toEqual(true)
    expect(showOutcome).toEqual(true)
  })

  it('should return a hand of 4 and Loss', async () => {
    dealFive = {
      deck: [
        {
          id: '81',
          value: 'Seven',
          suit: 'S',
        },
        {
          id: '77',
          value: 'Six',
          suit: 'S',
        },
        {
          id: '74',
          value: 'Five',
          suit: 'S',
        },
        {
          id: '76',
          value: 'Four',
          suit: 'S',
        },
      ],
      game: {
        id: '139',
        outcome: 'L',
      },
      outcome: 'You Lose, sucker',
      unplayedCount: 0,
      totalCount: 9,
    }
    const testResult = gameLogic(dealFive)
    expect(testResult).toEqual(false)
    expect(hand).toEqual(dealFive.deck)
    expect(canResume).toEqual(false)
    expect(remainingCardsInDeck).toEqual(dealFive.unplayedCount)
    expect(cardsInHand).toEqual(dealFive.totalCount - dealFive.unplayedCount)
    expect(showControlScheme).toEqual(false)
    expect(result).toEqual(false)
    expect(showOutcome).toEqual(true)
  })
})

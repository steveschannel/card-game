import {
  hand,
  showControlScheme,
  canResume,
  inGame,
  remainingCardsInDeck,
  cardsInHand,
  showOutcome,
  result,
} from 'game/framework/client'

export const initializeGame = (difficulty = false, deck, startGame) => {
  inGame(true)
  hand(null)
  showOutcome(false)
  showControlScheme(true)
  startGame({
    variables: { difficulty, deck },
  })
}

export const gameLogic = ({ dealFive }) => {
  hand(dealFive.deck)
  canResume(true)
  remainingCardsInDeck(dealFive.unplayedCount)
  cardsInHand(dealFive.totalCount - dealFive.unplayedCount)

  if (dealFive.game.outcome !== 'U') {
    showControlScheme(false)
    canResume(false)

    if (dealFive.game.outcome === 'L') {
      result(false)
    }
    if (dealFive.game.outcome === 'W') {
      result(true)
    }

    showOutcome(true)
    return false
  }
  return true
}

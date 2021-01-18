import { useMutation, useReactiveVar } from '@apollo/client'
import { Paper, Button, Modal, Grid } from '@material-ui/core'
import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import {
  hand,
  inGame,
  showControlScheme,
  remainingCardsInDeck,
  cardsInHand,
  showOutcome,
  result,
} from 'game/framework/client'
import { DEAL_CARDS } from 'game/framework/gql'
import { Card } from 'game/ui/card'
import { NewGameSelector } from 'game/ui/main-menu'
import { gameLogic } from 'game/use-cases/game-logic'

export const Hand = () => {
  const display = useReactiveVar(hand)

  return !display ? null : (
    <Grid container className="cardContainer mt-2" justify="center" spacing={5} id="deckContainer">
      {display.map(card => (
        <Card card={card} />
      ))}
    </Grid>
  )
}

export const Controls = () => {
  const [hit] = useMutation(DEAL_CARDS, {
    onCompleted: data => {
      gameLogic(data)
    },
  })

  const displayControls = useReactiveVar(showControlScheme)

  return displayControls ? (
    <div className="center mt-2">
      <Button
        id="deal"
        variant="contained"
        color="primary"
        onClick={() => hit({ variables: { gameId: localStorage.getItem('activeGame') } })}
      >
        Deal
      </Button>
    </div>
  ) : (
    <div className="center mt-2">
      <Link to="/game-menu" className="link">
        <Button id="deal" variant="contained" color="primary">
          Start New Game
        </Button>
      </Link>
    </div>
  )
}

export const ResultScreen = () => {
  const outcomeAvailable = useReactiveVar(showOutcome)
  const outcome = useReactiveVar(result)

  const message = outcome ? <h1>YOU WON!</h1> : <h1>You lost... Better Luck Next Time!</h1>
  return (
    <div>
      <Modal open={outcomeAvailable} onClose={() => showOutcome(false)}>
        <Paper elevation={5} className="center modal">
          {message}
          <p>Thanks for playing!</p>
          <div className="center mt-2">
            <NewGameSelector />
          </div>
        </Paper>
      </Modal>
    </div>
  )
}
export const GameInfo = () => {
  const deck = useReactiveVar(remainingCardsInDeck)
  const dealt = useReactiveVar(cardsInHand)
  return (
    <div className="center">
      <h3> Total Cards: {deck + dealt} </h3>
      <h3> Dealt Cards: {dealt} </h3>
      <h2> Cards Remaining: {deck}</h2>
    </div>
  )
}
export const GameView = () => {
  const displayGameWindow = useReactiveVar(inGame)
  return displayGameWindow ? (
    <>
      <h1 className="page-descriptor">Deal!</h1>
      <ResultScreen />
      <GameInfo />
      <Hand />
      <Controls />
    </>
  ) : (
    <Redirect to="/menu" />
  )
}

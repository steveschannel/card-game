import { useMutation, useQuery } from '@apollo/client'
import { Button, Select, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { cardsInHand, remainingCardsInDeck } from 'game/framework/client'
import { GET_DECKS, START_GAME } from 'game/framework/gql'
import { initializeGame } from 'game/use-cases/game-logic'

export const Difficulties = ({ setDifficulty }) => {
  if (localStorage.getItem('selectedDifficulty') === null) {
    localStorage.setItem('selectedDifficulty', true)
  }

  return (
    <Select
      defaultValue={localStorage.getItem('selectedDifficulty')}
      form="startGameForm"
      className="mw-2"
      onChange={e => {
        localStorage.setItem('selectedDifficulty', e.target.value)
        setDifficulty(e.target.value)
      }}
    >
      <MenuItem value={false}> Rigged (Easy)</MenuItem>
      <MenuItem value> Normal </MenuItem>
    </Select>
  )
}

export const Decks = ({ data, setDeck }) => {
  if (localStorage.getItem('selectedDeck') === null) {
    localStorage.setItem('selectedDeck', data.decks[0].id)
  }

  return (
    <Select
      defaultValue={localStorage.getItem('selectedDeck')}
      name="deck"
      id="deck"
      className="mw-2"
      onChange={e => {
        localStorage.setItem('selectedDeck', e.target.value)
        setDeck(e.target.value)
      }}
      form="startGameForm"
    >
      {data.decks.map(deck => (
        <MenuItem key={deck.id} value={deck.id}>
          {deck.title}
        </MenuItem>
      ))}
    </Select>
  )
}

export const StartGameMenu = () => {
  const { loading, error, data } = useQuery(GET_DECKS)

  const [difficulty, setDifficulty] = useState(localStorage.getItem('selectedDifficulty'))
  const [deck, setDeck] = useState(localStorage.getItem('selectedDeck'))

  const [startGame] = useMutation(START_GAME, {
    onCompleted: gameInfo => {
      localStorage.setItem('activeGame', gameInfo.startGame.game.id)
      remainingCardsInDeck(gameInfo.startGame.unplayedCount)
      cardsInHand(gameInfo.startGame.totalCount - gameInfo.startGame.unplayedCount)
    },
  })

  if (loading) return 'Loading...'

  if (error) return 'Error'

  return (
    <>
      <h1 className="page-descriptor">Start New Game</h1>
      <form
        id="startGameForm"
        className="center mt-2"
        onSubmit={() => initializeGame(difficulty, deck, startGame)}
      >
        <Difficulties setDifficulty={setDifficulty} />
        <Decks data={data} setDeck={setDeck} />
        <Link to="/game" onClick={() => initializeGame(difficulty, deck, startGame)}>
          <Button type="submit" form="startGameForm" variant="contained" color="primary">
            Start Game
          </Button>
        </Link>
      </form>
    </>
  )
}

import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { Paper, Select, MenuItem, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  inGame,
  showControlScheme,
  canResume,
  remainingCardsInDeck,
  cardsInHand,
} from 'game/framework/client'
import { LAST_GAME, RESUME_GAME, GET_HISTORY } from 'game/framework/gql'
import { Loading } from 'game/ui/loading'

export const Tally = () => {
  const [timeframe, setTimeframe] = useState(localStorage.getItem('tally'))
  const { loading, error, data, refetch } = useQuery(GET_HISTORY, {
    variables: { range: timeframe },
  })

  if (loading) return Loading(loading)

  if (error) return 'Error displaying game tally.'

  refetch()

  return (
    <div className="center">
      <h3>Games Won: {data.history.filter(status => status.outcome === 'W').length}</h3>
      <h3>Games Lost: {data.history.filter(status => status.outcome === 'L').length}</h3>
      <Select
        name="timeframe"
        id="timeframe"
        defaultValue={localStorage.getItem('tally')}
        onChange={e => {
          setTimeframe(e.target.value)
          localStorage.setItem('tally', e.target.value)
        }}
      >
        <MenuItem value={1}>Past Hour</MenuItem>
        <MenuItem value={24}>Past Day</MenuItem>
        <MenuItem value={72}>Last Three Days</MenuItem>
        <MenuItem value={168}>Last Week</MenuItem>
      </Select>
    </div>
  )
}

export const ResumeGameSelector = () => {
  const [resume] = useMutation(RESUME_GAME, {
    onCompleted: resumable => {
      localStorage.setItem('activeGame', resumable.resumeGame.game.id)
      remainingCardsInDeck(resumable.resumeGame.unplayedCount)
      cardsInHand(resumable.resumeGame.totalCount - resumable.resumeGame.unplayedCount)
    },
  })

  const showResumeButton = useReactiveVar(canResume)

  return showResumeButton ? (
    <Link
      to="/game"
      onClick={() => {
        resume()
        showControlScheme(true)
        inGame(true)
      }}
      className="link"
    >
      <Paper className="card animate" elevation={5}>
        <h2>Resume Last Game</h2>
      </Paper>
    </Link>
  ) : (
    <></>
  )
}

export const CardMenuSelector = () => {
  return (
    <Link to="/deck-menu" className="link">
      <Paper className="card animate" elevation={5}>
        <h2>View Decks</h2>
      </Paper>
    </Link>
  )
}

export const NewGameSelector = () => {
  return (
    <Link to="/game-menu" className="link">
      <Paper className="card animate" elevation={5}>
        <h2>Start New Game</h2>
      </Paper>
    </Link>
  )
}

export const MainMenu = () => {
  const { loading, error, data, refetch } = useQuery(LAST_GAME)

  if (loading) return Loading(loading)

  const resumeable = error ? null : <ResumeGameSelector data={data} item />

  refetch()
  canResume(data.canResumeLastGame)

  return (
    <>
      <h1 className="page-descriptor">Main Menu</h1>
      <Tally />
      <Grid container spacing={5} className="cardContainer" justify="center">
        <Grid item>{resumeable}</Grid>
        <Grid item>
          <CardMenuSelector />
        </Grid>
        <Grid item>
          <NewGameSelector />
        </Grid>
      </Grid>
    </>
  )
}

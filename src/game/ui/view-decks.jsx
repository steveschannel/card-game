import { useMutation, useQuery } from '@apollo/client'
import { Paper, Button, TextField, Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { CREATE_DECK, GET_DECKS, REMOVE_DECK } from 'game/framework/gql'

export const DeckCreationForm = () => {
  const [createDeck, { error }] = useMutation(CREATE_DECK, {
    update(cache, { data }) {
      const decksList = cache.readQuery({ query: GET_DECKS })
      cache.writeQuery({
        query: GET_DECKS,
        data: { decks: [...decksList.decks, data.createDeck] },
      })
    },
  })

  const [title, setTitle] = useState(null)
  return (
    <div className="center">
      <p>Add Deck</p>
      <form
        id="createDeck"
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          document.getElementById('createDeck').reset()
          setTitle(null)
          createDeck({ variables: { title } })
        }}
      >
        <TextField
          label="Deck Title"
          onChange={e => setTitle(e.target.value)}
          required
          variant="outlined"
        />
        <p>*required</p>
        <p>**names must be unique</p>
        <Button type="submit" variant="contained" color="primary">
          Create Deck
        </Button>
      </form>
    </div>
  )
}

export const DeckDeletionButton = ({ deck }) => {
  const [removeDeck] = useMutation(REMOVE_DECK, {
    update(cache) {
      //test
      const decksList = cache.readQuery({ query: GET_DECKS })
      const newDecksList = decksList.decks.filter(cachedDeck => cachedDeck.id !== deck.id)
      cache.writeQuery({
        query: GET_DECKS,
        data: { decks: newDecksList },
      })
    },
  })

  return (
    <Paper className="reveal">
      <Button
        className="deletion"
        color="secondary"
        onClick={() => removeDeck({ variables: { deckId: deck.id } })}
      >
        <Close />
      </Button>
    </Paper>
  )
}

export const DecksContainer = () => {
  const { loading, error, data } = useQuery(GET_DECKS)

  if (loading) return 'Loading...'

  if (error) return 'Error'

  return (
    <>
      <h1 className="page-descriptor">Decks</h1>
      <Grid container className="cardContainer" justify="center" spacing={5}>
        {data.decks.map(deck => (
          <Grid item className="card-control">
            <DeckDeletionButton deck={deck} />
            <Link to={`/edit-deck/?deck=${deck.id}`} className="link">
              <Paper className="card" key={deck.id} value={deck.id} elevation={5}>
                <h2>{deck.title}</h2>
              </Paper>
            </Link>
          </Grid>
        ))}
        <Grid item>
          <Paper className="creation">
            <DeckCreationForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export const Decks = withRouter(DecksContainer)

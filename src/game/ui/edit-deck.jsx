import { useMutation, useQuery } from '@apollo/client'
import { Select, Button, MenuItem, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { Client } from 'game/framework/client'
import { ADD_CARD, GET_CARDS, GET_TITLE } from 'game/framework/gql'
import { Card } from 'game/ui/card'

export const CardCreationForm = ({ deckId }) => {
  const [createCard] = useMutation(ADD_CARD, {
    update(cache, { data }) {
      const cardsList = cache.readQuery({ query: GET_CARDS, variables: { deckId } })
      cache.writeQuery({
        query: GET_CARDS,
        variables: { deckId },
        data: { deck: [data.createCard.card, ...cardsList.deck] },
      })
    },
  })
  const [suit, setSuit] = useState('S')
  const [value, setValue] = useState('Ace')
  return (
    <div className="center">
      <form
        id="createDeckForm"
        onSubmit={e => {
          e.preventDefault()
          createCard({ variables: { deck: deckId, suit, value } })
        }}
      >
        <Select
          name="value"
          id="value"
          className="mw-2"
          defaultValue="Ace"
          onChange={e => setValue(e.target.value)}
          form="createDeckForm"
        >
          <MenuItem value="Ace">Ace</MenuItem>
          <MenuItem value="Two">Two</MenuItem>
          <MenuItem value="Three">Three</MenuItem>
          <MenuItem value="Four">Four</MenuItem>
          <MenuItem value="Five">Five</MenuItem>
          <MenuItem value="Six">Six</MenuItem>
          <MenuItem value="Seven">Seven</MenuItem>
          <MenuItem value="Eight">Eight</MenuItem>
          <MenuItem value="Nine">Nine</MenuItem>
          <MenuItem value="Ten">Ten</MenuItem>
          <MenuItem value="Jack">Jack</MenuItem>
          <MenuItem value="Queen">Queen</MenuItem>
          <MenuItem value="King">King</MenuItem>
        </Select>
        <Select
          name="suit"
          id="suit"
          defaultValue="S"
          className="mw-2"
          onChange={e => setSuit(e.target.value)}
          form="createDeckForm"
        >
          <MenuItem value="S">Spades</MenuItem>
          <MenuItem value="H">Hearts</MenuItem>
          <MenuItem value="C">Clubs</MenuItem>
          <MenuItem value="D">Diamonds</MenuItem>
        </Select>

        <Button type="submit" variant="contained" color="primary">
          Add Card
        </Button>
      </form>
    </div>
  )
}

export const DeckTitle = ({ deckId }) => {
  const deck = Client.readFragment({
    id: `DeckType:${deckId}`,
    fragment: GET_TITLE,
  })

  return <h1 className="page-descriptor"> Editing Deck: {deck.title}</h1>
}

export const EditDeck = ({ location }) => {
  const deckId = new URLSearchParams(location.search).get('deck')

  const { loading, error, data } = useQuery(GET_CARDS, {
    variables: { deckId },
  })

  if (loading) return 'Loading...'

  if (error) return 'Error'

  return (
    <>
      <DeckTitle deckId={deckId} />
      <CardCreationForm deckId={deckId} />
      <Grid container className="cardContainer" justify="center" spacing={5}>
        {data.deck.map(card => (
          <Card card={card} deckId={deckId} setDelete />
        ))}
      </Grid>
    </>
  )
}

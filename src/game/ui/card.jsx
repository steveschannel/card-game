import { useMutation } from '@apollo/client'
import { Paper, Button, Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { REMOVE_CARD, GET_CARDS } from 'game/framework/gql'

export const DeleteCard = ({ cardId, deckId }) => {
  const [removeCard] = useMutation(REMOVE_CARD, {
    update(cache) {
      //test
      const cardsList = cache.readQuery({ query: GET_CARDS, variables: { deckId } })
      const newCardsList = cardsList.deck.filter(cachedCard => cachedCard.id !== cardId)
      cache.writeQuery({
        query: GET_CARDS,
        variables: { deckId },
        data: { deck: newCardsList },
      })
    },
  })

  return (
    <Paper className="reveal">
      <Button
        className="deletion"
        color="secondary"
        onClick={() => removeCard({ variables: { cardId } })}
      >
        <Close />
      </Button>
    </Paper>
  )
}

export const Card = ({ card, deckId, setDelete = false }) => {
  const delControls = setDelete === false ? null : <DeleteCard deckId={deckId} cardId={card.id} />
  return (
    <Grid item className="card-control">
      {delControls}
      <Paper key={card.id} value={card.id} className="card" elevation={5}>
        <h1>{card.value}</h1>
        <p>{card.suit}</p>
      </Paper>
    </Grid>
  )
}

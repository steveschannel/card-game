import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from '@apollo/client'

if (!localStorage.getItem('tally')) {
  localStorage.setItem('tally', 1)
}

export const hand = makeVar(null)
export const inGame = makeVar(false)
export const showControlScheme = makeVar(false)
export const canResume = makeVar(false)
export const showOutcome = makeVar(false)
export const result = makeVar(null)

export const cardsInHand = makeVar(null)
export const remainingCardsInDeck = makeVar(null)

export const link = createHttpLink({
  uri: '/graphql/',
  credentials: 'same-origin',
})

export const Client = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link,
})

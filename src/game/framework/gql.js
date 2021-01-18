import { gql } from '@apollo/client'

// QUERIES - GAME

export const GET_HISTORY = gql`
  query GAME_HISTORY($range: Int!) {
    history(range: $range) {
      outcome
    }
  }
`
export const LAST_GAME = gql`
  query LAST_GAME_RESUMABLE {
    canResumeLastGame
  }
`

export const GET_DECKS = gql`
  query USERS_DECKS {
    decks {
      title
      id
    }
  }
`
export const GET_CARDS = gql`
  query DECK_CARDS($deckId: Int!) {
    deck(deckId: $deckId) {
      value
      id
      suit
    }
  }
`

export const GET_TITLE = gql`
  fragment DeckTitle on DeckType {
    title
  }
`

// MUTATIONS - AUTH

export const LOGIN_USER = gql`
  mutation LOGIN($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        username
        password
      }
    }
  }
`

// MUTATIONS - GAME FUNCTIONS

export const DEAL_CARDS = gql`
  mutation DEAL($gameId: Int!) {
    dealFive(gameId: $gameId) {
      deck {
        id
        value
        suit
      }
      game {
        id
        outcome
      }
      outcome
      unplayedCount
      totalCount
    }
  }
`
export const RESUME_GAME = gql`
  mutation RESUME {
    resumeGame {
      game {
        id
        outcome
        timestamp
      }
      totalCount
      unplayedCount
    }
  }
`
export const RESET_GAME = gql`
  mutation LOGIN {
    loginUser(username: "interview", password: "uplifty") {
      user {
        username
        password
      }
    }
  }
`
// MUTATIONS - DECKS AND CARDS

export const CREATE_DECK = gql`
  mutation CREATE_DECK($title: String!) {
    createDeck(title: $title) {
      deck {
        title
        id
      }
    }
  }
`
export const REMOVE_DECK = gql`
  mutation REMOVE_DECK($deckId: Int!) {
    deleteDeck(deckId: $deckId) {
      deleteSuccess
    }
  }
`
export const START_GAME = gql`
  mutation START_GAME($difficulty: Boolean!, $deck: Int!) {
    startGame(difficulty: $difficulty, deck: $deck) {
      game {
        id
        activeDeck {
          id
        }
      }
      unplayedCount
      totalCount
    }
  }
`
export const ADD_CARD = gql`
  mutation ADD_CARD($deck: Int!, $suit: String!, $value: String!) {
    createCard(deck: $deck, suit: $suit, value: $value) {
      card {
        id
        value
        suit
      }
    }
  }
`
export const REMOVE_CARD = gql`
  mutation REMOVE_CARD($cardId: Int!) {
    deleteCard(cardId: $cardId) {
      deleteSuccess
    }
  }
`

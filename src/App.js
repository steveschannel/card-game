import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthView } from './game/ui/auth-view'
import { EditDeck } from './game/ui/edit-deck'
import { StartGameMenu } from './game/ui/game-setup'
import { GameView } from './game/ui/game-view'
import { Login } from './game/ui/login'
import { MainMenu } from './game/ui/main-menu'
import { Navigation } from './game/ui/nav'
import { Decks } from './game/ui/view-decks'
import { Client } from 'game/framework/client'
import './App.css'

function App() {
  return (
    <ApolloProvider client={Client}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthView>
            <Navigation />
            <Switch>
              <Route path="/menu" component={MainMenu} />
              <Route path="/game-menu" component={StartGameMenu} />
              <Route path="/deck-menu" component={Decks} />
              <Route path="/edit-deck" component={EditDeck} />
              <Route path="/game" component={GameView} />
              <Redirect from="/" to="/menu" />
            </Switch>
          </AuthView>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App

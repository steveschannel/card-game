import { Button } from '@material-ui/core'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { inGame, showControlScheme, hand } from 'game/framework/client'

export const NavContainer = () => {
  const logout = () => {
    localStorage.removeItem('auth')
  }
  const clearGameData = () => {
    hand(null)
    inGame(false)
    showControlScheme(false)
  }
  return (
    <div className="nav">
      <Link to="/menu" className="link">
        <Button id="main" variant="contained" type="button" onClick={() => clearGameData()}>
          Main Menu
        </Button>
      </Link>
      <Link to="/" className="link">
        <Button id="logout" type="button" onClick={logout} variant="outlined" color="secondary">
          Logout
        </Button>
      </Link>
    </div>
  )
}

export const Navigation = withRouter(NavContainer)

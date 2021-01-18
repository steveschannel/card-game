import React from 'react'
import { Redirect } from 'react-router-dom'

export const AuthView = ({ children }) => {
  return localStorage.getItem('auth') ? children : <Redirect to="/login" />
}

export default AuthView

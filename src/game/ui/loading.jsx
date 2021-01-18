import { CircularProgress, Backdrop } from '@material-ui/core'
import React from 'react'

export const Loading = loading => {
  return (
    <div className="center">
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  )
}

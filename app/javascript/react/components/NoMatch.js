import React from 'react'

const NoMatch = (props) => {
  return(
    <>
      <h3>Error: This page does not exist.</h3>
      <a className="underline" href="/welcome">Home</a>
      <a className="underline" href="/">Return to My Events</a>
    </>
  )
}

export default NoMatch

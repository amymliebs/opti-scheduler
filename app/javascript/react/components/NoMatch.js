import React from 'react'

const NoMatch = (props) => {
  return(
    <div className="centered-all-around">
      <h3>Error: This page does not exist.</h3>
      <a className="underline" href="/">Home</a>
      <br />
      <a className="underline" href="/events">Return to My Events</a>
    </div>
  )
}

export default NoMatch

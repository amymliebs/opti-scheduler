import React from 'react'

const EventDetailsTile = (props) => {
  return(
    <div>
      <h1>{props.eventName}</h1>
      <div>{props.eventDescription}</div>
      <div>{props.location}</div>
      <div>{props.eventDate}</div>
      <div>{props.rsvpDate}</div>
      <div>{props.rsvpStatus}</div>
    </div>
  )
}

export default EventDetailsTile

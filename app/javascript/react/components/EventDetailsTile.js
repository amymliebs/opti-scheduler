import React from 'react'

const EventDetailsTile = (props) => {
  return(
    <div>
      <h1 className="primary-header">{props.eventName}</h1>
      <div className="secondary-header">{props.eventDescription}</div>
      <div className="sub-text">{props.location}</div>
      <div id="event-date">{props.eventDate}</div>
      <div id="rsvp-date">{props.rsvpDate}</div>
      <div id="rsvp-status">{props.rsvpStatus}</div>
    </div>
  )
}

export default EventDetailsTile

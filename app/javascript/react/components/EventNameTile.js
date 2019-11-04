import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const EventNameTile = (props) => {
  return(
    <div className="three wide column index-tile">
      <Link to={`/events/${props.accessCode}`}>
        <div className="event-name">{props.eventName}</div>
      </Link>
      <div className="rsvp-status">{props.rsvpStatus}</div>
    </div>
  )
}

export default EventNameTile

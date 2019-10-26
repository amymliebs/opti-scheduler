import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const EventNameTile = (props) => {
  return(
    <Link to={`/events/${props.id}`}>
      <div className="event-name">{props.eventName}</div>
    <div className="rsvp-status">{props.rsvpStatus}</div>
    </Link>
  )
}

export default EventNameTile

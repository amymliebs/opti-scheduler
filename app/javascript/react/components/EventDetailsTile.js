import React, { useEffect } from 'react'

const EventDetailsTile = (props) => {
  const formattedDate = (date) => {
    if (date) {
      const nums = date.split("-")
      const year = nums[0]
      const month = nums[1]
      const day = nums[2]

      return(
        <span>{month}-{day}-{year}</span>
      )
    }
  }

  let formattedEventDate = formattedDate(props.eventDate)
  let formattedRsvpDate = formattedDate(props.rsvpDate)

  return(
    <div>
      <h1 className="primary-header">{props.eventName}</h1>
      <div className="secondary-header">Description: {props.eventDescription}</div>
      <div className="sub-text">Location: {props.location}</div>
      <div className="date">Event Date: {formattedEventDate}</div>
      <div className="date">Please RSVP by {formattedRsvpDate}</div>
      <div id="rsvp-status">Schedule status: {props.rsvpStatus}</div>
    </div>
  )
}

export default EventDetailsTile

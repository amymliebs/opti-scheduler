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
      <div className="event-details">
        <p className="primary-subheader centered"><b>Your Event Window Details</b></p>
        <div className="event-specifics">
          <p className="sub-text"><b>Location:</b> {props.location}</p>
          <p className="date"><b>Event Date:</b> {formattedEventDate}</p>
          <p className="event-description"><b>Description:</b> {props.eventDescription}</p>
          <p className="date"><b>RSVP by {formattedRsvpDate}</b></p>
          <p id="rsvp-status"><b>Schedule status:</b> {props.rsvpStatus}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsTile

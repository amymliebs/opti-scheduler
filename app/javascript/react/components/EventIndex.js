import React, { useState, useEffect } from 'react'
import humps from 'humps'
import EventNameTile from './EventNameTile'

const EventIndex = (props) => {
  const[events, setEvents] = useState([])

  useEffect(() => {
    fetch('api/v1/events.json')
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      let eventList = humps.camelizeKeys(body)
      setEvents(eventList)

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let noEventsMessage = "visible"
  if (events.length > 0) {
    noEventsMessage = "hidden"
  }

  const eventTiles = events.map((event) => {
    return(
      <EventNameTile
        key={event.id}
        id={event.id}
        accessCode={event.accessCode}
        eventName={event.eventName}
        rsvpStatus={event.rsvpStatus}
      />
    )
  })

  return (
    <div className="main-background">
      <h3 className="primary-header">My Event Windows</h3>
      <h4 className="primary-subheader">Select the name of an event to view its details</h4>
      <div className="event-bumper">
      </div>

      <div className={`${noEventsMessage} centered blue-alert`}>
        You don't have any events yet. <br /> Select <b>Create an Event Window</b> in the navigation bar to get started!
      </div>

      <div className="ui stackable grid centered">
        {eventTiles}
      </div>
      <div className="bottom-margin">
      </div>
    </div>
  )
}

export default EventIndex

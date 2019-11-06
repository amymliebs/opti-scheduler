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


  let loaderStatus = "active"
  if (events == []) {
    loaderStatus = "disabled"
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
    <div className="index-page">
      <div className="filter">
      <h3 className="primary-header">My Event Windows</h3>
      <h4 className="secondary-subheader">Select the name of an event to view its details</h4>
      <div className="to-align">
      </div>

      <div className="ui stackable grid centered">
        {eventTiles}
      </div>
      </div>
    </div>
  )
}

export default EventIndex

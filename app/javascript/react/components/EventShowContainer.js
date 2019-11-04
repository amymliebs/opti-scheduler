import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import humps from 'humps'
import EventNameTile from './EventNameTile'
import EventDetailsTile from './EventDetailsTile'

const EventShowContainer = (props) => {
  const[event, setEvent] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [timeslots, setTimeslots] = useState([])
  let eventCode = props.match.params.eventCode

  useEffect(() => {
    fetch(`/api/v1/events/${eventCode}`)
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
      let thisEvent = humps.camelizeKeys(body)
      setEvent(thisEvent.event)
      setTimeslots(thisEvent.timeslots)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const deleteEvent = (eventCode) => {
    fetch(`/api/v1/events/${eventCode}.json`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
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
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleDeleteClick = () => {
    deleteEvent(eventCode)
  }

  if (shouldRedirect){
    return <Redirect to="/" />
  }

  return(
    <div className="fading-background">
      <div>
        <button className="main-button" onClick={handleDeleteClick}>
          DELETE MY EVENT
        </button>
      </div>
      <div className="ui stackable grid">
        <div className="sixteen wide column">
          <h1 className="primary-header">{event.eventName}</h1>
        </div>
        <div className="eight wide column">
          <EventDetailsTile
            eventDescription={event.eventDescription}
            location={event.location}
            eventDate={event.eventDate}
            rsvpDate={event.rsvpDate}
            rsvpStatus={event.rsvpStatus}
          />
        </div>
        <div className="eight wide column">
          <div className="complete-schedule">
            <div className="primary-subheader centered"><b>
              Complete Schedule</b>
            </div>
            <div className="schedule-pending centered">
              Your schedule will appear here once it has been set.
            </div>
            <div className="centered">
            <button className="main-button">CREATE MY SCHEDULE!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventShowContainer

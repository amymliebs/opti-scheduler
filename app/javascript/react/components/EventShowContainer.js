import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import humps from 'humps'
import EventNameTile from './EventNameTile'
import EventDetailsTile from './EventDetailsTile'

const EventShowContainer = (props) => {
  const[event, setEvent] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [timeslots, setTimeslots] = useState([])
  const [availabilities, setAvailabilities] = useState([])
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
      setAvailabilities(thisEvent.availabilities)
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
    return <Redirect to="/events" />
  }

  const handleScheduleCreation = (action) => {
    let payload = {
      event: {
        eventId: event.id
      },
      times: {
        slots: timeslots
      },
      availableTimes: {
        possibilities: availabilities
      }
    }

    createSchedule(payload)
  }

  const createSchedule = (payload) => {
    fetch(`/api/v1/events/${eventCode}/create_schedule`, {
      method: "PATCH",
      body: JSON.stringify(humps.decamelizeKeys(payload)),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
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
    .then(persistedData => {
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to="/thankyou" />
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
        <div className="seven wide column">
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
            <button onClick={handleScheduleCreation} className="main-button">CREATE MY SCHEDULE!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer">
      </div>
    </div>
  )
}

export default EventShowContainer

import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import humps from 'humps'
import EventNameTile from './EventNameTile'
import EventDetailsTile from './EventDetailsTile'
import ScheduledTimeTile from './ScheduledTimeTile'

const EventShowContainer = (props) => {
  const[event, setEvent] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [timeslots, setTimeslots] = useState([])
  const [availabilities, setAvailabilities] = useState([])
  const [invitees, setInvitees] = useState([])
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
      if (thisEvent.timeslots) {
        setTimeslots(thisEvent.timeslots)
        setAvailabilities(thisEvent.availabilities)
        setInvitees(thisEvent.invitees)
      }
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

  const refreshPage = () => {
    window.location.reload(false);
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
    refreshPage()
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
      setShouldRedirect(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleTextSend = (action) => {
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

    schedulingButton = <div>A text message reminder has been sent to each invitee who provided a valid phone number.</div>

    sendReminderText(payload)
  }

  const sendReminderText = (payload) => {
    fetch(`/api/v1/events/${eventCode}/send_reminder`, {
      method: "POST",
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
      setShouldRedirect(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to="/events" />
  }

  let schedulingButton
  let tableClass = "hidden"
  let remaining_availabilities = false
  let no_rsvps = true

  availabilities.forEach((availability) => {
    if (availability.length != 0) {
      no_rsvps = false
    }
    availability.forEach((slot) => {
      if (slot.status == "available") {
        remaining_availabilities = true
      }
    })
  })

  if (no_rsvps) {
    schedulingButton = <div id="awaiting-rsvps">Awaiting RSVPs</div>
  } else if (remaining_availabilities) {
    schedulingButton = <button onClick={handleScheduleCreation} className="main-button">CREATE MY SCHEDULE</button>
  } else {
    tableClass = "visible"
    schedulingButton = <button onClick={handleTextSend} className="main-button">TEXT A REMINDER</button>
  }

  let unscheduledClass = "hidden"
  let unscheduledInvitees = []

  let scheduledMeetings = invitees.map((inviteeDetails) => {
    if (!remaining_availabilities && inviteeDetails) {
      if (inviteeDetails.inviteeEmail) {
        if (!no_rsvps) {
          unscheduledInvitees.push(inviteeDetails.inviteeEmail)
          unscheduledClass = "visible"
        }
      } else {
        return(
          <ScheduledTimeTile
            key={inviteeDetails.invitee.inviteeId}
            name={inviteeDetails.invitee.name}
            email={inviteeDetails.invitee.email}
            timeslot={inviteeDetails.invitee.scheduledSlot}
          />
        )
      }
    }
  })

  let listedUnscheduled
  let unscheduledList = unscheduledInvitees.join(', ')
  if (unscheduledInvitees.length > 1) {
    const last = unscheduledInvitees.pop()
    listedUnscheduled = unscheduledInvitees.join(', ') + ' and ' + last
  }
  let unscheduledNotice = <div className={`${unscheduledClass} blue-alert-small`}> Unable to schedule the following invitees:&ensp; {listedUnscheduled} </div>

  return(
    <div className="main-background">
      <div className="ui stackable grid">
        <div className="sixteen wide column">
          <h1 className="primary-header">{event.eventName}</h1>
        </div>
        <div className="event-bumper">
        </div>

        <div className="seven wide column container">
          <EventDetailsTile
            eventDescription={event.eventDescription}
            location={event.location}
            eventDate={event.eventDate}
            rsvpDate={event.rsvpDate}
            rsvpStatus={event.rsvpStatus}
          />
        </div>
        <div className="seven wide column container">
          <div className="complete-schedule">
            <div className="secondary-subheader">
              <b>Complete Schedule</b>
            </div>
            <div className="schedule-pending centered">
              Your schedule will appear here once it has been set.
            </div>
            <div className="ui two column centered grid">
              <div>
                {schedulingButton}
              </div>
              <div className="gap">
              </div>
              <div className="centered row">
                <table className={`ui yellow collapsing celled table ${tableClass}`}>
                  <thead>
                    <tr>
                      <th>Invitee</th>
                      <th>Email Address</th>
                      <th>Meeting Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledMeetings}
                  </tbody>
                </table>
              </div>
              {unscheduledNotice}
            </div>
          </div>
        </div>
      </div>
      <div className="gap">
      </div>
      <div>
        <button className="delete-it main-button" onClick={handleDeleteClick}>
          DELETE MY EVENT
        </button>
      </div>
      <div className="spacer">
      </div>
    </div>
  )
}

export default EventShowContainer

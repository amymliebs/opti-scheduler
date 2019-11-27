import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import humps from 'humps'
import EventNameTile from './EventNameTile'
import EventDetailsTile from './EventDetailsTile'
import ScheduledTimeTile from './ScheduledTimeTile'
import { Line } from 'rc-progress'

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

  let rsvpProgress
  let awaitingRsvp = []
  let awaitingRsvpCount = 0
  let totalInvitees = invitees.length
  invitees.forEach((inviteeDetails) => {
    if (!inviteeDetails.inviteeEmail) {
      awaitingRsvpCount += 1
    } else {
      awaitingRsvp.push(inviteeDetails.inviteeEmail)
    }
  })

  let percentRsvped = (awaitingRsvpCount / totalInvitees) * 100

  let listedAwaitingRsvp
  if (awaitingRsvp.length > 1) {
    const lastAwaiting = awaitingRsvp.pop()
    listedAwaitingRsvp = awaitingRsvp.join(', ') + ' and ' + lastAwaiting
  }

  if (no_rsvps || remaining_availabilities) {
    rsvpProgress =
      <div className="centered awaiting-details">
        <Line percent={percentRsvped} strokeWidth="8" strokeColor="#2db7f5" trailWidth="8" className="progress-bar"/>
        <div id="awaiting-rsvps">{awaitingRsvpCount} out of {totalInvitees} Invitees have RSVPed</div>
        <div id="awaiting-invitees">Awaiting RSVPs from {listedAwaitingRsvp}</div>
      </div>
  } else {
    tableClass = "visible"
    schedulingButton = <button onClick={handleTextSend} className="main-button">TEXT A REMINDER</button>
  }

  if (remaining_availabilities) {
      schedulingButton = <button onClick={handleScheduleCreation} className="main-button middle-button">CREATE MY SCHEDULE</button>
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
              <b>Schedule</b>
            </div>
            <div className="ui two column centered grid">
              <div>
                {rsvpProgress}
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

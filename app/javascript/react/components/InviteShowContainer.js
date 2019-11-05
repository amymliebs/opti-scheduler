import React, { useState, useEffect } from 'react'
import humps from 'humps'
import EventDetailsTile from './EventDetailsTile'
import RSVPForm from './RSVPForm'

const InviteShowContainer = (props) => {
  const[invitee, setInvitee] = useState({})
  const[event, setEvent] = useState({})
  const[timeslots, setTimeslots] = useState([])
  let eventCode = props.match.params.eventCode
  let inviteeCode = props.match.params.inviteeCode

  useEffect(() => {
    fetch(`/api/v1/events/${eventCode}/invitees/${inviteeCode}`)
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
      let camelizedBody = humps.camelizeKeys(body)
      setInvitee(camelizedBody.invitee)
      setEvent(camelizedBody.event)
      setTimeslots(camelizedBody.timeslots)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return(
    <div className="ui stackable grid fading-background">
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

      <div className="seven wide column float right">
        <RSVPForm
          email={invitee.email}
          inviteeCode={inviteeCode}
          eventCode={eventCode}
          timeslots={timeslots}
        />
      </div>
    </div>
  )
}


export default InviteShowContainer

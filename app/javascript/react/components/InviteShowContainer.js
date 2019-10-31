import React, { useState, useEffect } from 'react'
import humps from 'humps'
import EventDetailsTile from './EventDetailsTile'
import RSVPForm from './RSVPForm'

const InviteShowContainer = (props) => {
  const[invitee, setInvitee] = useState({})
  const[event, setEvent] = useState({})
  const[timeslots, setTimeslots] = useState([])
  let eventId = props.match.params.event_id
  let inviteeId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/events/${eventId}/invitees/${inviteeId}`)
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
      setEvent(camelizedBody.event)
      setTimeslots(camelizedBody.timeslots)
      setInvitee(camelizedBody.invitee)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])


  return(
    <div>
      <EventDetailsTile
        eventName={event.eventName}
        eventDescription={event.eventDescription}
        location={event.location}
        eventDate={event.eventDate}
        rsvpDate={event.rsvpDate}
        rsvpStatus={event.rsvpStatus}
      />
      <RSVPForm
      />
    </div>
  )
}


export default InviteShowContainer

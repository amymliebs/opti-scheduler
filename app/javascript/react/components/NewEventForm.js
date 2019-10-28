import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import ErrorList from "./ErrorList"

const NewEventForm = (props) => {
  const[errors, setErrors]= useState({})
  const[shouldRedirect, setShouldRedirect] = useState(false)
  const[newEvent, setNewEvent] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    rsvpDate: "",
    invitees: ""
  })

  const handleFieldChange = (event) => {
    setNewEvent({
      ...newEvent,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearFields = (event) => {
    event.preventDefault()
    setNewEvent({
      eventName: "",
      eventDescription: "",
      eventDate: "",
      rsvpDate: "",
      invitees: ""
    })
    setErrors({})
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["eventName", "eventDescription"]
    requiredFields.forEach(field => {
      if (newEvent[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleEventSubmit = (event) =>{
    event.preventDefault()
    if (!validForSubmission()){
      return
    }

    let payload = {
      eventName: newEvent.eventName,
      eventDescription: newEvent.eventDescription,
      eventDate: newEvent.eventDate,
      rsvpDate: newEvent.rsvpDate,
      invitees: newEvent.invitees
    }

    addNewEvent(payload)
    setNewEvent({
      eventName: "",
      eventDescription: "",
      eventDate: "",
      rsvpDate: "",
      invitees: ""
    })
  }

  const addNewEvent = (payload) => {
    fetch("/api/v1/events", {
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
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to="/events" />
  }

  return(
    <div>
      <h2>New Event Window Form </h2>

      <form onSubmit={handleEventSubmit}>
        <ErrorList errors={errors} />

        <label> Event Window Name
          <input
            name="eventName"
            type="text"
            onChange={handleFieldChange}
            value={newEvent.eventName}
          />
        </label>

        <label> Event Window Description
          <textarea
            name="eventDescription"
            rows="4"
            onChange={handleFieldChange}
            value={newEvent.eventDescription}
            placeholder="Write a description to give your guests context for the event. This description will be visible to every person you invite to schedule an event during this window."
          />
        </label>

        <label> Event Window Date
          <input
            type="date"
            min="2019-11-01"
            value={newEvent.eventDate}
            onChange={handleFieldChange}
          />
        </label>

        <label> RSVP by Date
          <input
            type="date"
            min="2019-11-01"
            onChange={handleFieldChange}
          />
        </label>

        <label> Guests
          <textarea
            name="invitees"
            rows="5"
            value={newEvent.invitees}
            onChange={handleFieldChange}
            placeholder="List the email addresses of your guests, separated by commas."
          />
        </label>

        <input type="submit" value="Send Invitations!"/>
      </form>
    </div>
  )
}

export default NewEventForm

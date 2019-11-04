import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import DatePicker from "react-datepicker"
import ErrorList from "./ErrorList"
import Timeslots from "../data/Timeslots.js"
import CheckboxGroup from 'react-checkbox-group'

const NewEventForm = (props) => {
  const reset = {
    eventName: "",
    eventDescription: "",
    location: "",
    eventDate: eventDate,
    rsvpDate: rsvpDate,
    invitees: ""
  }

  const[errors, setErrors]= useState({})
  const[shouldRedirect, setShouldRedirect] = useState(false)
  const[eventDate, setEventDate] = useState(new Date())
  const[rsvpDate, setRsvpDate] = useState(new Date())
  const[newEvent, setNewEvent] = useState(reset)
  const[timeslots, setTimeslots] = useState([])

  const handleFieldChange = (event) => {
    setNewEvent({
      ...newEvent,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearFields = (event) => {
    event.preventDefault()
    setNewEvent(reset)
    setErrors({})
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["eventName", "invitees"]
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

  const handleEventSubmit = (action) =>{
    action.preventDefault()
    if (!validForSubmission()){
      return
    }

    let payload = {
      event: {
        eventName: newEvent.eventName,
        eventDescription: newEvent.eventDescription,
        location: newEvent.location,
        eventDate: eventDate,
        rsvpDate: rsvpDate
      },
      timeslot: {
        slot: timeslots
      },
      invitee: {
        email: newEvent.invitees
      }
    }

    addNewEvent(payload)
    setNewEvent(reset)
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
    return <Redirect to="/" />
  }

  return(
    <div>
      <h2 className="primary-header">New Event Window Form </h2>
      <form onSubmit={handleEventSubmit}>
        <ErrorList errors={errors} />

        <div className="event-form">
          <div className="form-field">
            <label> Event Window Name *
              <input
                name="eventName"
                type="text"
                onChange={handleFieldChange}
                value={newEvent.eventName}
              />
            </label>
          </div>

          <div className="form-field">
            <label> Location
              <input
                name="location"
                type="text"
                onChange={handleFieldChange}
                value={newEvent.location}
              />
            </label>
          </div>

          <div className="form-field">
            <label> Event Window Description <br />
              <textarea
                className="textarea-box"
                name="eventDescription"
                rows="4"
                onChange={handleFieldChange}
                value={newEvent.eventDescription}
                placeholder="Write a description to give your guests context for the event. This description will be visible to every person you invite to schedule an event during this window."
              />
            </label>
          </div>

          <div className="form-field">
            <label> Event Window Date
              <DatePicker
                className="centered"
                name="eventDate"
                selected={eventDate}
                onChange={date => setEventDate(date)}
                placeholderText="mm-dd-yyyy"
                minDate={new Date()}
              />
            </label>
          </div>

          <div className="form-field">
            <label> RSVP by Date
              <DatePicker
                className="centered"
                name="rsvpDate"
                selected={rsvpDate}
                onChange={date => setRsvpDate(date)}
                placeholderText="mm-dd-yyyy"
                maxDate={eventDate}
                minDate={new Date()}
              />
            </label>
          </div>

          <div className="form-field">
            <label> Guests <br />
              <textarea
                className="textarea-box"
                name="invitees"
                rows="5"
                value={newEvent.invitees}
                onChange={handleFieldChange}
                placeholder="List the email addresses of your guests, separated by commas."
              />
            </label>
          </div>
        </div>

        <div className="timeslots">
          <Timeslots
            timeslots={timeslots}
            setTimeslots={setTimeslots}
          />
          <div className="centered">
          <input className="form-button" type="submit" value="Send Invitations!"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewEventForm

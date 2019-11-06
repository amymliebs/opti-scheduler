import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import DatePicker from "react-datepicker"
import ErrorList from "./ErrorList"
import TimeslotTile from "./TimeslotTile.js"

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
    return <Redirect to="/events" />
  }

  const slots = [
    '12:00-1:00am',
    '1:00-2:00am',
    '2:00-3:00am',
    '3:00-4:00am',
    '4:00-5:00am',
    '5:00-6:00am',
    '6:00-7:00am',
    '7:00-8:00am',
    '8:00-9:00am',
    '9:00-10:00am',
    '10:00-11:00am',
    '11:00-12:00am',
    'Noon-1:00pm',
    '1:00-2:00pm',
    '2:00-3:00pm',
    '3:00-4:00pm',
    '4:00-5:00pm',
    '5:00-6:00pm',
    '6:00-7:00pm',
    '7:00-8:00pm',
    '8:00-9:00pm',
    '9:00-10:00pm',
    '10:00-11:00pm',
    '11:00pm-12:00'
  ]

  const handleTimeClick = (slot) => {
    if (timeslots.includes(slot)) {
      setTimeslots(timeslots.filter(timeslot => timeslot != slot))
    } else {
      setTimeslots([...timeslots, slot])
    }
  }

  let times = slots.map((slot) => {
    let selectionStatus = "unselected"
    if (timeslots.includes(slot)) {
      selectionStatus = "selected"
    }

    return(
      <TimeslotTile
        key={slot}
        timeslot={slot}
        selectionStatus={selectionStatus}
        handleTimeClick={handleTimeClick}
      />
    )
  })

  return(
    <div className="fading-background">
      <h2 className="primary-header">New Event Window Form </h2>
      <div className="space-below">
      </div>
      <div className="ui large form">
        <ErrorList errors={errors} />
        <div className="left-column">

          <div className="inline required field">
            <label>Event Window Name</label>
            <input
              type="text"
              name="eventName"
              value={newEvent.eventName}
              onChange={handleFieldChange}
              placeholder="Event Window Name"
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="inline field">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleFieldChange}
              placeholder="Location"
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="field">
            <label>Event Window Description</label>
            <textarea
              className="textarea-box"
              name="eventDescription"
              rows="3"
              onChange={handleFieldChange}
              value={newEvent.eventDescription}
              placeholder="Write a description to give your guests context for the event. This description will be visible to every person you invite to schedule an event during this window."
              >
            </textarea>
          </div>

          <div className="two fields">
            <div className="mini-space">
            </div>
            <div className="required field">
              <label>Event Window Date</label>
                <DatePicker
                  className="centered"
                  name="eventDate"
                  selected={eventDate}
                  onChange={date => setEventDate(date)}
                  placeholderText="mm-dd-yyyy"
                  minDate={new Date()}
                />
            </div>

            <div className="required field">
              <label>RSVP by Date</label>
                <DatePicker
                  className="centered"
                  name="rsvpDate"
                  selected={rsvpDate}
                  onChange={date => setRsvpDate(date)}
                  placeholderText="mm-dd-yyyy"
                  maxDate={eventDate}
                  minDate={new Date()}
                />
            </div>
          </div>

          <div className="mini-space">
          </div>
          <div className="required field">
            <label>Invitees</label>
            <span className="sub-label">List the email addresses of your guests, separated by commas.</span>
            <div className="space-it">
            </div>
            <textarea
              className="textarea-box"
              name="invitees"
              onChange={handleFieldChange}
              value={newEvent.invitees}
              placeholder="jchristianson@email.com, arobinson@email.com, wduerte@gmail.com"
              >
            </textarea>
          </div>
        </div>

        <div className="to-align">
        </div>
        <div className="right-column">
          <label className="timeslots-label">Available Times:&ensp;Select the times you are available to meet. These times set the window available for your invitees. </label>

          <div className="spaced-gap">
          </div>

          <div className="times column">
            <div className="ui stackable grid">
              {times}
            </div>
          <div className="space-below"></div>
          <div className="centered">
            <form onSubmit={handleEventSubmit}>
              <input
                className="form-button"
                type="submit"
                value="Send Invitations!"
              />
            </form>
          </div>
          
          </div>
        </div>
      </div>
      <div className="spacer">
      </div>
    </div>
  )
}

export default NewEventForm

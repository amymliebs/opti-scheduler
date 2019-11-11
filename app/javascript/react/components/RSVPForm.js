import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import ErrorList from "./ErrorList"
import TimeslotTile from './TimeslotTile'

const RSVPForm = (props) => {
  const reset = {
    firstName: "",
    lastName: "",
    email: props.email,
    note: "",
    phone: "",
    timeslots: selectedTimeslots
  }

  const[errors, setErrors] = useState({})
  const[shouldRedirect, setShouldRedirect] = useState(false)
  const[newRSVP, setNewRSVP] = useState({
    firstName: "",
    lastName: "",
    email: "",
    note: "",
    phone: "",
    timeslots: selectedTimeslots
  })
  const[selectedTimeslots, setSelectedTimeslots] = useState([])

  useEffect(() => {
    setNewRSVP({email: props.email})
  },[props])

  const handleFieldChange = (event) => {
    setNewRSVP({
      ...newRSVP,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearFields = (event) => {
    event.preventDefault()
    setNewRSVP(reset)
    setErrors({})
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["firstName"]
    requiredFields.forEach(field => {
      if (newRSVP[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleRSVPSubmit = (action) =>{
    action.preventDefault()
    if (!validForSubmission()){
      return
    }

    let payload = {
      invitees: {
        firstName: newRSVP.firstName,
        lastName: newRSVP.lastName,
        email: newRSVP.email,
        note: newRSVP.note,
        phone: newRSVP.phone
      },
      availabilities: {
        timeslots: selectedTimeslots
      }
    }

    addNewRSVP(payload)
    setNewRSVP(reset)
  }

  const addNewRSVP = (payload) => {
    fetch(`/api/v1/events/${props.eventCode}/invitees/${props.inviteeCode}`, {
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

  const handleTimeClick = (id) => {
    if (selectedTimeslots.includes(id)) {
      setSelectedTimeslots(selectedTimeslots.filter(timeslot => timeslot != id))
    } else {
      setSelectedTimeslots([...selectedTimeslots, id])
    }
  }

  let options = props.timeslots.map((time) => {
    let selectionStatus = "unselected"
    if (selectedTimeslots.includes(time.slot)) {
      selectionStatus = "selected"
    }

    return(
      <TimeslotTile
        key={time.slot}
        timeslotId={time.id}
        timeslot={time.slot}
        selectionStatus={selectionStatus}
        handleTimeClick={handleTimeClick}
      />
    )
  })

  return(
    <div>
      <h2 className="secondary-subheader rsvp-header">RSVP with Your Availability </h2>

      <div className="ui large form">
        <ErrorList errors={errors} />
        <div className="rsvp-form">

          <div className="inline required field">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              onChange={handleFieldChange}
              value={newRSVP.firstName}
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="inline field">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              onChange={handleFieldChange}
              value={newRSVP.lastName}
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="inline required field">
            <label>Email</label>
            <input
              name="email"
              type="text"
              onChange={handleFieldChange}
              value={newRSVP.email}
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="inline field">
            <label>Cell phone number</label>
            <input
              name="phone"
              type="text"
              onChange={handleFieldChange}
              value={newRSVP.phone}
              placeholder="555-555-5555"
              className="centered"
            />
          </div>

          <div className="mini-space">
          </div>
          <div className="timeslots-label required field"> Available Times:&ensp;Select the times you are available to meet.  </div>
          <div className="times column">
            <div className="ui stackable grid">
              {options}
            </div>
          </div>

          <div className="gap">
          </div>
          <div className="field limited-box">
            <label> Note for host: (optional)</label>
            <textarea
              className="textarea-box"
              name="note"
              rows="4"
              onChange={handleFieldChange}
              value={newRSVP.note}
              placeholder="(Optional)  Write a note to the host"
            >
            </textarea>

          </div>
        </div>

        <div className="rsvp-submit">
          <form onSubmit={handleRSVPSubmit}>
            <input
              className="form-button"
              type="submit"
              value="RSVP"
            />
          </form>
        </div>
        <div className="spacer">
        </div>
      </div>
    </div>
  )
}

export default RSVPForm

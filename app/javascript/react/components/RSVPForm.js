import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import ErrorList from "./ErrorList"
import Timeslots from "../data/Timeslots.js"
import CheckboxGroup from 'react-checkbox-group'
import TimeslotTile from './TimeslotTile'

const RSVPForm = (props) => {
  const reset = {
    firstName: "",
    lastName: "",
    email: props.email,
    note: "",
    timeslots: selectedTimeslots
  }

  const[errors, setErrors] = useState({})
  const[shouldRedirect, setShouldRedirect] = useState(false)
  const[newRSVP, setNewRSVP] = useState({
    firstName: "",
    lastName: "",
    email: "",
    note: "",
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
        note: newRSVP.note
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

  let options = props.timeslots.map((time) => {
    return(
      <TimeslotTile
        key={time.slot}
        timeslot={time.slot}
        selectedTimeslots={selectedTimeslots}
        setSelectedTimeslots={setSelectedTimeslots}
      />
    )
  })

  return(
    <div>
      <h2>RSVP with Your Availability </h2>

      <form onSubmit={handleRSVPSubmit}>
        <ErrorList errors={errors} />

        <label> First Name *
          <input
            name="firstName"
            type="text"
            onChange={handleFieldChange}
            value={newRSVP.firstName}
          />
        </label>

        <label> Last Name *
          <input
            name="lastName"
            type="text"
            onChange={handleFieldChange}
            value={newRSVP.lastName}
          />
        </label>

        <label> Email
          <input
            name="email"
            type="text"
            onChange={handleFieldChange}
            value={newRSVP.email}
          />
        </label>

        {options}

        <label> Note for host: (optional)
          <textarea
            name="note"
            rows="4"
            onChange={handleFieldChange}
            value={newRSVP.note}
            placeholder="[Optional]  Write a note to the host regarding the meeting."
          />
        </label>

        <input type="submit" value="RSVP!"/>
      </form>
    </div>
  )
}

export default RSVPForm

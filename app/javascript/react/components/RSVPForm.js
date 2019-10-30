import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import DatePicker from "react-datepicker"
import ErrorList from "./ErrorList"
import Timeslots from "../data/Timeslots.js"
import CheckboxGroup from 'react-checkbox-group'

const RSVPForm = (props) => {
  const reset = {

  }

  const[errors, setErrors] = useState({})
  const[shouldRedirect, setShouldRedirect] = useState(false)
  const[newRSVP, setRSVP] = useState(reset)
  const[timeslots, setTimeslots] = useState([])

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
    const requiredFields = ["eventName"]
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
    }

    addNewRSVP(payload)
    setNewRSVP(reset)
  }

  const addNewRSVP = (payload) => {
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
      <h2>Availability RSVP</h2>
    </div>
  )
}

import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import humps from 'humps'
import _ from 'lodash'
import ErrorList from "./ErrorList"
import Timeslots from "../data/Timeslots.js"
import CheckboxGroup from 'react-checkbox-group'

const EventRSVPContainer = (props) => {
  const[event, setEvent] = useState({})
  const [timeslots, setTimeslots] = useState([])

  useEffect(() => {
    fetch(`/api/v1/events/${eventId}/rsvp`)
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
      setTimeslots(thisEvent.timeslots)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

}

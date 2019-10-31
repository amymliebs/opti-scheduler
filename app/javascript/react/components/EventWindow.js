import React from 'react'

const EventWindow = (props) => {
  return(

  )





  const availableTimes = props.timeslots.map ((timeslot) => {
    return(
      <label>
        <Checkbox value={timeslot} /> {timeslot}
      </label>
    )}
  )

  return(
    <div>
      <div> Event window times go here </div>
        <CheckboxGroup name="timeslots" value={props.selectedTimeslots} onChange={props.setSelectedTimeslots}>
          {(Checkbox) => ({availableTimes} )}
      </CheckboxGroup>
    </div>
  )
}

export default EventWindow

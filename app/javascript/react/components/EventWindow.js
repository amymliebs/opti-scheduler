import React from 'react'
import CheckboxGroup from 'react-checkbox-group'

const EventWindow = (props) => {

  const availableTimes = {
    <CheckboxGroup name="timeslots" value={props.selectedTimeslots} onChange={props.setSelectedTimeslots}>
      {(Checkbox) => (
        <>
          <div>
            props.timeslots.forEach ((timeslot) => {
              <label>
                <Checkbox value={timeslot} /> {timeslot}
              </label>
            })
          </div>
        </>
      )}
    </CheckboxGroup>
  }

  return(
    <div>
      <div> Event window times go here </div>
      {availableTimes}
    </div>
  )
}

export default EventWindow

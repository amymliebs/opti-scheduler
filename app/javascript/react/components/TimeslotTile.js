import React from 'react';

const TimeslotTile = (props) => {

  const handleCheckboxChange = (event) => {
    if ((props.selectedTimeslots).includes(event.currentTarget.name)) {
      props.setSelectedTimeslots(props.selectedTimeslots.filter(timeslot => timeslot != event.currentTarget.name))
    } else {
      props.setSelectedTimeslots([...props.selectedTimeslots, event.currentTarget.name])
    }
  }

  return(
    <label>
      <input
        type="checkbox"
        name={props.timeslot}
        onChange={handleCheckboxChange}
      />
        {props.timeslot}
    </label>
  )
}

export default TimeslotTile;

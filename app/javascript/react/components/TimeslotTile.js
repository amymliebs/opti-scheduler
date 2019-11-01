import React from 'react';

const TimeslotTile = (props) => {

  return(
    <label>
      <input
        type="checkbox"
      />
        {props.timeslot}
    </label>
  )
}

export default TimeslotTile;

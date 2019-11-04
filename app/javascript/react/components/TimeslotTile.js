import React from 'react';

const TimeslotTile = (props) => {
  const handleClick = ((event) => {
    props.handleTimeClick(event.currentTarget.id)
  })

  return(
    <div>
      <div className={`${props.selectionStatus} time centered four wide column`} onClick={handleClick} id={props.timeslot} name={props.timeslot}
        value={props.timeslotId}>
        {props.timeslot}
      </div>
    </div>
  )
}

export default TimeslotTile;

import React from 'react';

const TimeslotTile = (props) => {
  const handleClick = ((event) => {
    props.handleTimeClick(event.currentTarget.innerText)
  })

  return(
    <div>
      <div className={`${props.selectionStatus} time centered three wide column`} onClick={handleClick} name={props.timeslot}>
        {props.timeslot}
      </div>
    </div>
  )
}

export default TimeslotTile;

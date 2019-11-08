import React from 'react';

const ScheduledTimeTile = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.timeslot}</td>
    </tr>
  )
}

export default ScheduledTimeTile;

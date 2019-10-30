import React from 'react'

const EventDetails = (props) => {

  const handleDeleteClick = () => {
    props.deleteEvent(props.eventId)
  }

  return(
    <>
      <button onClick={handleDeleteClick}>DELETE MY EVENT</button>
      <h2>{props.eventName}</h2>
    </>
  )



}

export default EventDetails

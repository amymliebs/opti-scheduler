import React from 'react'

const HowToList = (props) => {
  return (
    <div id="how-to-boxes">
      <div className="ui stackable grid">
        <div className="four wide column">
        </div>
        <div className="how-to-box three wide column" id="how-to-one">
          <div className="first-box secondary-header">Create Your Event Window</div>
        </div>
        <div className="how-to-box three wide column" id="how-to-two">
          <div className="box secondary-header">Attendees RSVP with Availabilities</div>
        </div>
        <div className="how-to-box three wide column" id="how-to-three">
          <div className="box secondary-header">OptiScheduler Makes Your Schedule!</div>
        </div>
      </div>
    </div>
  )
}

export default HowToList

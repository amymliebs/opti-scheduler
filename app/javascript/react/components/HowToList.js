import React from 'react'

const HowToList = (props) => {
  return (
    <div id="how-to-boxes">
      <div className="ui stackable grid">
        <div className="four wide column">
        </div>
        <div className="how-to-box three wide column" id="how-to-one">
          <div className="secondary-header">Schedule Your Event Window</div>
          <img className="preview-image"></img>
        </div>
        <div className="how-to-box three wide column" id="how-to-two">
          <div className="secondary-header">Attendees RSVP with Availabilities</div>
          <img className="preview-image"></img>
        </div>
        <div className="how-to-box three wide column" id="how-to-three">
          <div className="secondary-header">OptiScheduler Makes Your Schedule!</div>
          <img className="preview-image"></img>
        </div>
      </div>
    </div>
  )
}

export default HowToList

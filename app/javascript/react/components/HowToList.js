import React from 'react'

const HowToList = (props) => {
  return (
    <div id="how-to-boxes">
      <div className="ui grid">
        <div className="how-to-box four wide column" id="how-to-one">
          Schedule Your Event Window
          <img className="preview-image"></img>
        </div>
        <div className="how-to-box four wide column" id="how-to-two">
          Attendees RSVP with Availabilities
          <img className="preview-image"></img>
        </div>
        <div className="how-to-box four wide column" id="how-to-three">
          OptiScheduler Makes Your Schedule!
          <img className="preview-image"></img>
        </div>
      </div>
      <button className="primary-button">Get Started!</button>
      <p>Alread a user? &ensp;
        <a href="/users/sign_in">
          Log In
        </a>
      </p>

    </div>
  )
}

export default HowToList

import React, { useState } from "react"

const RSVPThankYou = (props) => {
  return(
    <div className="thank-you centered">
      <h1>Thank You for RSVPing</h1>
      <h4>You will recieve an email after the RSVP date with your meeting time.</h4>
      <div className="logo"><i className="far fa-clock"></i>ptiScheduler</div>
      <div className="spacer">
      </div>
      <a className="big-sign-up" href="/welcome">Schedule events with OptiScheduler! &ensp; Click here for more information on getting started.</a>
    </div>
  )
}

export default RSVPThankYou

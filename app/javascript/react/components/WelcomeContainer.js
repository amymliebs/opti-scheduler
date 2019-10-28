import React from 'react'
import HowToList from './HowToList'
import { Link } from "react-router-dom"

const WelcomeContainer = (props) => {
  return (
    <div id='welcome-page'>
      <HowToList
      />
      <a className="attention-button" href="/users/sign_up">Get Started!</a>
      <p className="user-question">Alread a user? &ensp;
      <a className="underline" href="/users/sign_in">
        Log In
      </a>
      </p>
    </div>
  )
}

export default WelcomeContainer

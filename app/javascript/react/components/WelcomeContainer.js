import React from 'react'
import HowToList from './HowToList'
import { Link } from "react-router-dom"

const WelcomeContainer = (props) => {
  return (
    <div id='welcome-page'>
      <HowToList
      />
    <Link to="/users/sign_up" className="primary-button">Get Started!</Link>
      <p>Alread a user? &ensp;
        <a href="/users/sign_in">
          Log In
        </a>
      </p>
    </div>
  )
}

export default WelcomeContainer

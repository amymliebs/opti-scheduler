import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import WelcomeContainer from './WelcomeContainer'
import EventIndex from './EventIndex'
import NewEventForm from './NewEventForm'
import EventShowContainer from './EventShowContainer'
import InviteShowContainer from './InviteShowContainer'
import RSVPThankYou from './RSVPThankYou'
import NoMatch from './NoMatch'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={WelcomeContainer}
        />
        <Route
          exact path="/events"
          component={EventIndex}
        />
        <Route
          exact path="/events/new"
          component={NewEventForm}
        />
        <Route
          exact path="/events/:eventCode/invitees/:inviteeCode"
          component={InviteShowContainer}
        />
        <Route
          exact path="/events/:eventCode"
          component={EventShowContainer}
        />
        <Route
          exact path="/thankyou"
          component={RSVPThankYou}
        />
        <Route
          component={NoMatch}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App

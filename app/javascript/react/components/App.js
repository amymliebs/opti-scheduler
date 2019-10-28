import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import WelcomeContainer from './WelcomeContainer'
import EventIndex from './EventIndex'
import NewEventForm from './NewEventForm'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeContainer}/>
        <Route exact path="/events" component={EventIndex}/>
        <Route exact path="/events/new" component={NewEventForm}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App

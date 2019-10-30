import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import WelcomeContainer from './WelcomeContainer'
import EventIndex from './EventIndex'
import NewEventForm from './NewEventForm'
import EventShowContainer from './EventShowContainer'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeContainer}/>
        <Route exact path="/events" component={EventIndex}/>
        <Route exact path="/events/new" component={NewEventForm}/>
        <Route exact path="/events/:id" component={EventShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App

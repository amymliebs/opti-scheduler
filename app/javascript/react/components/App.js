import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import WelcomeContainer from './WelcomeContainer'
import EventIndex from './EventIndex'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeContainer}/>
        <Route exact path="/events" component={EventIndex}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App

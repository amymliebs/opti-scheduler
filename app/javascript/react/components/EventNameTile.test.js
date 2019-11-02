import React from "react"
import Enzyme, { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16"
import EventNameTile from "./EventNameTile"
Enzyme.configure({ adapter: new Adapter() })


describe ("EventNameTile", () => {
  let wrapper

  beforeEach(() =>{
    wrapper = mount(
      <BrowserRouter>
        <EventNameTile
          eventName="July 26th Check-In"
          rsvpStatus="schedule pending"
          accessCode="32"
        />
      </BrowserRouter>
    )
  })

  it("should say the name of each event", () => {
    expect(wrapper.find('.event-name').text()).toBe("July 26th Check-In")
  })

  it("should display the rsvp status of each event", () => {
    expect(wrapper.find('.rsvp-status').text()).toBe("schedule pending")
  })

  it("should render a link to the event show page", () => {
    const link = wrapper.find('Link').first()

    expect(link).toBeDefined()
    expect(link.props()["to"]).toBe("/events/32")
  })
})

import React from "react"
import Enzyme, { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16"
import EventDetailsTile from "./EventDetailsTile"
Enzyme.configure({ adapter: new Adapter() })


describe ("EventDetailsTile", () => {
  let wrapper

  beforeEach(() =>{
    wrapper = mount(
      <BrowserRouter>
        <EventDetailsTile
          eventName="July 26th Check-In"
          eventDescription="Please sign up for a time to check in."
          location="Room 213"
          eventDate="2019-02-14"
          rsvpDate="2019-02-08"
          rsvpStatus="Schedule pending"
        />
      </BrowserRouter>
    )
  })

  it("should say the name of the event", () => {
    expect(wrapper.find('.primary-header').text()).toBe("July 26th Check-In")
  })

  it("should say the description of the event", () => {
    expect(wrapper.find('.secondary-header').text()).toBe("Description: Please sign up for a time to check in.")
  })

  it("should say the location of the event", () => {
    expect(wrapper.find('.sub-text').text()).toBe("Location: Room 213")
  })

  it("should say the date of the event", () => {
    expect(wrapper.find('.date').at(0).text()).toBe("Event Date: 02-14-2019")
  })

  it("should say the RSVP date of the event", () => {
    expect(wrapper.find('.date').at(1).text()).toBe("Please RSVP by 02-08-2019")
  })

  it("should display the rsvp status of the event", () => {
    expect(wrapper.find('#rsvp-status').text()).toBe("Schedule status: Schedule pending")
  })
})
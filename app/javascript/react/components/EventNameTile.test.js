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
          id="32"
        />
      </BrowserRouter>
    )
  })

  it("visitor goes to index page sees a list of parks", () => {
    expect(wrapper.find('.event-name').text()).toBe("July 26th Check-In")
  })

  it("visitor goes to index page sees a list of parks", () => {
    expect(wrapper.find('.rsvp-status').text()).toBe("schedule pending")
  })

  it("should render a link to /parks", () => {
    const link = wrapper.find('Link').first()

    expect(link).toBeDefined()
    expect(link.props()["to"]).toBe("/events/32")
  })
})

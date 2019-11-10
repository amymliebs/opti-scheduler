import React from "react"
import Enzyme, { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16"
import ScheduledTimeTile from "./ScheduledTimeTile"
Enzyme.configure({ adapter: new Adapter() })


describe ("ScheduledTimeTile", () => {
  let wrapper

  beforeEach(() =>{
    wrapper = mount(
      <BrowserRouter>
        <ScheduledTimeTile
          name="Yami Daughtry"
          email="example@email.com"
          timeslot="4:00-5:00pm"
        />
      </BrowserRouter>
    )
  })

  it("should render the name of the scheduled invitee", () => {
    expect(wrapper.find('td').at(0).text()).toBe("Yami Daughtry")
  })

  it("should render the email of the scheduled invitee", () => {
    expect(wrapper.find('td').at(1).text()).toBe("example@email.com")
  })

  it("should render the assigned timeslot of the scheduled invitee", () => {
    expect(wrapper.find('td').at(2).text()).toBe("4:00-5:00pm")
  })
})

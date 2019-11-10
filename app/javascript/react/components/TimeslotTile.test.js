import React from "react"
import Enzyme, { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16"
import TimeslotTile from "./TimeslotTile"
Enzyme.configure({ adapter: new Adapter() })


describe ("TimeslotTile", () => {
  let wrapper

  beforeEach(() =>{
    wrapper = mount(
      <BrowserRouter>
        <TimeslotTile
          selectionStatus="selected"
          timeslot="4:00-5:00pm"
        />
      </BrowserRouter>
    )
  })

  it("should render the name of the scheduled invitee", () => {
    expect(wrapper.find('.time').text()).toBe("4:00-5:00pm")
  })
})

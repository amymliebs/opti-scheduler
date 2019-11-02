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
          timeslot="8:00-9:00am"
        />
      </BrowserRouter>
    )
  })

  it("should say teh name of each event", () => {
    expect(wrapper.find('label').text()).toBe("8:00-9:00am")
  })
})

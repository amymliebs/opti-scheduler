import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import ErrorList from "./ErrorList"

describe("ErrorList", () => {
  let wrapper
  let wrapperTwo

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ErrorList
          errors={["Eventname can't be blank", "Invitees can't be blank"]}
        />
      </BrowserRouter>
    )
    wrapperTwo = mount(
      <BrowserRouter>
        <ErrorList
          errors={{}}
        />
      </BrowserRouter>
    )
  })

  it('should display the error list', () => {
    expect(wrapper.find("li").at(0).text()).toContain("Eventname can't be blank")
    expect(wrapper.find("li").at(1).text()).toContain("Invitees can't be blank")
    expect(wrapper.find("li").length).toBe(2)
  })

  it('should not display the error list', () => {
    expect(wrapperTwo.find("li").length).toBe(0)
  })
})

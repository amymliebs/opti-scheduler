import React from "react"
import Enzyme, { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16"
import WelcomeContainer from "./WelcomeContainer"
Enzyme.configure({ adapter: new Adapter() })


describe ("WelcomeContainer", () => {
  let wrapper

  beforeEach(() =>{
    wrapper = mount(
      <BrowserRouter>
        <WelcomeContainer
        />
      </BrowserRouter>
    )
  })

  it("should render a link to the sign in page", () => {
    expect(wrapper.find('.underline').text()).toEqual("Log In")
  })
})

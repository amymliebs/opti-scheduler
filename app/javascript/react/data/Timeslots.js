import React from 'react'
import CheckboxGroup from 'react-checkbox-group'

const Timeslots = (props) => {
  const slots = [
    '12:00-1:00am',
    '1:00-2:00am',
    '2:00-3:00am',
    '3:00-4:00am',
    '4:00-5:00am',
    '5:00-6:00am',
    '6:00-7:00am',
    '7:00-8:00am',
    '8:00-9:00am',
    '9:00-10:00am',
    '10:00-11:00am',
    '11:00-12:00am',
    '12:00am-1:00pm',
    '1:00-2:00pm',
    '2:00-3:00pm',
    '3:00-4:00pm',
    '4:00-5:00pm',
    '5:00-6:00pm',
    '6:00-7:00pm',
    '7:00-8:00pm',
    '8:00-9:00pm',
    '9:00-10:00pm',
    '10:00-11:00pm',
    '11:00pm-12:00am'
  ]

  return (
    <CheckboxGroup name="timeslots" value={props.timeslots} onChange={props.setTimeslots}>
      {(Checkbox) => (
        <>
          <div>
            <label>
              <Checkbox value="12:00-1:00am" /> 12:00-1:00am
            </label>
            <label>
              <Checkbox value="1:00-2:00am" /> 1:00-2:00am
            </label>
            <label>
              <Checkbox value="2:00-3:00am" /> 2:00-3:00am
            </label>
            <label>
              <Checkbox value="3:00-4:00am" /> 3:00-4:00am
            </label>
            <label>
              <Checkbox value="4:00-5:00am" /> 4:00-5:00am
            </label>
            <label>
              <Checkbox value="5:00-6:00am" /> 5:00-6:00am
            </label>
            <label>
              <Checkbox value="6:00-7:00am" /> 6:00-7:00am
            </label>
            <label>
              <Checkbox value="7:00-8:00am" /> 7:00-8:00am
            </label>
          </div>
          <div>
            <label>
              <Checkbox value="8:00-9:00am" /> 8:00-9:00am
            </label>
            <label>
              <Checkbox value="9:00-10:00am" /> 9:00-10:00am
            </label>
            <label>
              <Checkbox value="10:00-11:00am" /> 10:00-11:00am
            </label>
            <label>
              <Checkbox value="11:00am-12:00pm" /> 11:00am-12:00pm
            </label>
            <label>
              <Checkbox value="12:00-1:00pm" /> 12:00-1:00pm
            </label>
            <label>
              <Checkbox value="1:00-2:00pm" /> 1:00-2:00pm
            </label>
            <label>
              <Checkbox value="2:00-3:00pm" /> 2:00-3:00pm
            </label>
            <label>
              <Checkbox value="3:00-4:00pm" /> 3:00-4:00pm
            </label>
            <label>
              <Checkbox value="4:00-5:00pm" /> 4:00-5:00pm
            </label>
          </div>
          <div>
            <label>
              <Checkbox value="5:00-6:00pm" /> 5:00-6:00pm
            </label>
            <label>
              <Checkbox value="6:00-7:00pm" /> 6:00-7:00pm
            </label>
            <label>
              <Checkbox value="7:00-8:00pm" /> 7:00-8:00pm
            </label>
            <label>
              <Checkbox value="8:00-9:00pm" /> 8:00-9:00pm
            </label>
            <label>
              <Checkbox value="9:00-10:00pm" /> 9:00-10:00pm
            </label>
            <label>
              <Checkbox value="10:00-11:00pm" /> 10:00-11:00pm
            </label>
            <label>
              <Checkbox value="11:00pm-12:00am" /> 11:00pm-12:00am
            </label>
          </div>
        </>
      )}
    </CheckboxGroup>
  )
}

export default Timeslots

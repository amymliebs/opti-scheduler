import React, {useState, useEffect} from 'react'

const EventWindow = (props) => {
  const [rsvpTimes, setRsvpTimes] = useState([])

  useEffect(() => {
    let rsvpTimes=[
      { slot: '9:00-10:00am'},
      { slot: '11:00am-12:00pm'},
      { slot: '3:00-4:00pm'}
    ]
    setRsvpTimes(rsvpTimes)
  }, [])
  // 
  // let boxes = rsvpTimes.map((time) => {
  //   <input type="checkbox">time.slot</input>
  // })


  return(
    <div>
      <p> Are there checkboxes?!?</p>
      {boxes}
    </div>
  )
}

  //
  //
  // const availableTimes = props.timeslots.map ((timeslot) => {
  //   return(
  //     <label>
  //       <Checkbox value={timeslot} /> {timeslot}
  //     </label>
  //   )}
  // )
  //
  // return(
  //   <div>
  //     <div> Event window times go here </div>
  //       <CheckboxGroup name="timeslots" value={props.selectedTimeslots} onChange={props.setSelectedTimeslots}>
  //         {(Checkbox) => ({availableTimes} )}
  //     </CheckboxGroup>
  //   </div>
  // )


export default EventWindow

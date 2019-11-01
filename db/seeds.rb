users = User.create!([
  { first_name: 'Jane', last_name: 'Doe', email: 'janedoe123@gmail.com', password: 'janedoepassword'},
  { first_name: 'John', last_name: 'Doe', email: 'johndoe123@gmail.com', password: 'jondoepassword'},
  { first_name: 'Julio', last_name: 'Martinez', email: 'juliomartinez123@gmail.com', password: 'juliomartinezpassword'}
  ])

events = Event.create!([
  { event_name: 'July 28th', event_description: 'I will be visiting from out of town. It will be a blast!', event_date: '2019-10-30', rsvp_date: '2019-01-30', access_code: '2j438c', user_id: 2 },
  { event_name: 'Anna\'s San Diego Visit', event_date: '2020-01-01', rsvp_date: '2019-12-31', access_code: '348fjk', user_id: 1 }
  ])

timeslots = Timeslot.create!([
  { slot: '1:00-2:00', event_id: 1 }
  ])

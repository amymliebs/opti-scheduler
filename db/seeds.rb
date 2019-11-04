users = User.create!([
  { first_name: 'Jane', last_name: 'Doe', email: 'janedoe123@gmail.com', password: 'password'},
  { first_name: 'John', last_name: 'Doe', email: 'johndoe123@gmail.com', password: 'password'},
  { first_name: 'Julia', last_name: 'Martinez', email: 'juliamartinez123@gmail.com', password: 'password'}
  ])

events = Event.create!([
  { event_name: 'Meeting with Jorge Feb. 26', event_description: 'I want to do some check-ins on how the big project is going. Please RSVP with all times you are available. Thank you.', event_date: '2020-02-26', rsvp_date: '2020-02-19', access_code: '2j438c', user_id: 2 },
  { event_name: 'OptiCo. 1-on-1s', event_description: 'Please RSVP with all times you are available for a one-on-one follow-up meeting. Thanks!', event_date: '2020-03-01', rsvp_date: '2020-02-29', access_code: 'km38cj', user_id: 2 },
  { event_name: 'Mid-Year Reviews', event_description: 'Please let me know when you are available for your midyear review.', event_date: '2020-03-24', rsvp_date: '2020-03-04', access_code: 'vm2mi8', user_id: 1 }
  ])

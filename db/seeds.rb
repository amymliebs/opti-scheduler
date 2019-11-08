users = User.create!([
  { first_name: 'Jane', last_name: 'Doe', email: 'janedoe123@gmail.com', password: 'password'},
  { first_name: 'Anna', last_name: 'Duerte', email: 'aduerte@gmail.com', password: 'password'},
  { first_name: 'Adam', last_name: 'Carlioz', email: 'acarlioz@gmail.com', password: 'password'},
  { first_name: 'Julia', last_name: 'Martinez', email: 'juliamartinez123@gmail.com', password: 'password'},
  { first_name: 'Omar', last_name: 'Habib', email: 'ohabib@gmail.com', password: 'password'}
])

events = Event.create!([
  { event_name: 'Meeting with Jorge on Feb. 26', event_description: 'I want to do some check-ins on how the big project is going. Please RSVP with all times you are available. You will receive an email with your timeslot after the RSVP date. Thank you.', event_date: '2020-02-26', rsvp_date: '2020-02-19', access_code: '2j438c', rsvp_status: "Scheduled", user_id: 2 },

  { event_name: 'OptiCo. 1-on-1s', event_description: 'Please RSVP with all times you are available for a one-on-one follow-up meeting. Thanks!', event_date: '2020-03-01', rsvp_date: '2020-02-29', access_code: 'km38cj', rsvp_status: "Scheduled", user_id: 2 },

  { event_name: 'Mid-Year Reviews', event_description: 'Please let me know when you are available for your midyear review. Please bring notes on your progress toward your goals.', event_date: '2020-01-12', rsvp_date: '2020-01-02', access_code: 'dn4k2m', rsvp_status: "Scheduled", user_id: 2 },

  { event_name: 'Project Check-In', event_description: 'Let\'s check in on the project. Please bring work to-date to show.', event_date: '2020-09-24', rsvp_date: '2020-09-09', access_code: 'cpsk3m', user_id: 2 },

  { event_name: '6-Month Planning', event_description: 'We\'ll meet to plan out the second half of the year. Come prepared with your thoughts on how everything is going to-date.', event_date: '2020-07-12', rsvp_date: '2020-07-01', access_code: 'd8vmrw', user_id: 2 },

  { event_name: 'Gantt Chart Creation', event_description: 'Long term planning meeting.', event_date: '2020-04-17', rsvp_date: '2020-04-10', access_code: '7mcco1', user_id: 2 }
])

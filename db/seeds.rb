# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create!([
  { first_name: 'Jane', last_name: 'Doe', email: 'janedoe123@gmail.com', password: 'janedoepassword'},
  { first_name: 'John', last_name: 'Doe', email: 'johndoe123@gmail.com', password: 'jondoepassword'},
  { first_name: 'Julio', last_name: 'Martinez', email: 'juliomartinez123@gmail.com', password: 'juliomartinezpassword' }
  ])

events = Event.create!([
  { event_name: 'July 28th', event_description: 'I will be visiting from out of town. It will be a blast!', access_code: '2j438c', user_id: 2 },
  { event_name: 'Anna\'s San Diego Visit', access_code: '348fjk', user_id: 1 }
  ])

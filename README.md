# OptiScheduler

[![Codeship Status for amymliebs/opti-scheduler](https://app.codeship.com/projects/e5deb8d0-daf6-0137-d950-52cf7283ff5a/status?branch=master)](https://app.codeship.com/projects/371379)

OptiScheduler is a schedule optimization application designed for scheduling one-on-one meetings. A user, or event host, creates an event window, indicating the times they are available, and invites everyone with whom they would like to meet during that window. Invitees RSVP via a link they receive via email. OptiScheduler's algorithm determines the best schedule by filling as many meeting times as possible and prioritizing invitees in the order in which they RSVPed.

Hosts have the option to send a text message to an invitee who chose to provide their cell phone number. The text message states the event name, date, and the individual's scheduled meeting time.


## View the Application
See the application running on Heroku at http://optischeduler.herokuapp.com/ <br />
Note, the Twilio API only texts numbers verified with Twilio.


## Technologies

* Ruby 2.6.5
* Rails 5.2.3
* React 16.8.0
* Semantic UI
* Devise
* Action Mailer
* SendGrid
* Twilio
* React-Datepicker 2.9.6
* Factory Bot
* Faker
* Super Token


## Running Locally

Download the repository and run `yarn install` and `bundle install` in your terminal.

Set up your database:
```
bundle exec rake db:create
bundle exec rake db:migrate
```

See the file `.env.example` for required variables that must be set up to run the application.

Run the application locally by starting a rails server and a yarn server in separate windows in your terminal:
```
yarn run start
rails server
```

In your browser, navigate to `localhost:3000` to view the application.

Test suites can be run in separate windows in your terminal:
```
yarn test
bundle exec rspec
```

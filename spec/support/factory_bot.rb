require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :event do
    event_name { Faker::FunnyName.three_word_name }
    event_description { Faker::Lorem.paragraph(sentence_count: 3) }
    event_date { Faker::Date.in_date_period }
    rsvp_date { Faker::Date.in_date_period }

    user
  end

  factory :timeslot do
    slot { '0:00-0:00' }

    event
  end

end

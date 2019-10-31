require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should belong_to :user }
  it { should have_many :timeslots }
  it { should have_many :invitees }

  it { should have_valid(:event_name).when("Ciara visits California") }
  it { should_not have_valid(:event_name).when(nil, "") }

  it { should have_valid(:event_date).when("2019-10-30") }
  it { should_not have_valid(:event_date).when(nil, "") }

  it { should have_valid(:rsvp_date).when("2019-10-15") }
  it { should_not have_valid(:rsvp_date).when(nil, "") }
end

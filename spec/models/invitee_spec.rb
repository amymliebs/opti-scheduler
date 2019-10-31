require 'rails_helper'

RSpec.describe Invitee, type: :model do
  it { should belong_to :event }

  it { should have_many :availabilities }
  it { should have_many :timeslots }

  it { should have_valid(:email).when("thisisatest@gmail.com") }
  it { should_not have_valid(:email).when(nil, "") }
end

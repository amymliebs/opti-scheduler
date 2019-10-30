require 'rails_helper'

RSpec.describe Availability, type: :model do
  it { should belong_to :timeslot }
  it { should belong_to :invitee }

  it { should have_valid(:status).when("scheduled") }
  it { should_not have_valid(:status).when(nil, "") }
end

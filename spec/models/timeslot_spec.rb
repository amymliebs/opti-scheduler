require 'rails_helper'

RSpec.describe Timeslot, type: :model do
  it { should belong_to :event }

  it { should have_valid(:slot).when("8:00-9:00am") }
  it { should_not have_valid(:slot).when(nil, "") }
end

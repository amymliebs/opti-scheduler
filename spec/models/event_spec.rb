require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should belong_to :user }

  it { should have_valid(:event_name).when("Ciara visits California") }
  it { should_not have_valid(:event_name).when(nil, "") }
end

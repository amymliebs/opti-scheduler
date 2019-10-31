require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_many :events }

  it { should have_valid(:first_name).when("Amaya") }
  it { should_not have_valid(:first_name).when(nil, "") }

  it { should have_valid(:last_name).when("Johnson") }
  it { should_not have_valid(:last_name).when(nil, "") }

  it { should have_valid(:email).when("froggyfriend1000@gmail.com") }
  it { should_not have_valid(:email).when(nil, "") }

  it { should have_valid(:password).when("password") }
  it { should_not have_valid(:password).when(nil, "") }
end

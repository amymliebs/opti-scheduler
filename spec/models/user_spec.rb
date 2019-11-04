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

describe "#admin?" do
  it "is not an admin if the role is not admin" do
    user = FactoryBot.create(:user, role: "member")
    expect(user.admin?).to eq(false)
  end

  it "is an admin if the role is admin" do
    user = FactoryBot.create(:user, role: "admin")
    expect(user.admin?).to eq(true)
  end
end

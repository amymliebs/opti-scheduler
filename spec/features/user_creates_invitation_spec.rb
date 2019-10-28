require 'rails_helper'

feature 'user creates an invitation' do
  scenario "create an event" do
    ActionMailer::Base.deliveries.clear

    user = FactoryBot.create(:user)
    event = FactoryBot.create(:event)

    sign_in_as(user)

    visit events_new_path(event)

    fill_in "Event Window Name", with: "July 7th"
    fill_in "Event Window Description", with: "I'll be in town and would love to catch up. Please let me know when you're free!"
    fill_in "Guests", with: "kliebs2461@gmail.com, amymliebs@gmail.com"

    click_button "Send Invitations!"
    expect(page).to have_content("July 7th")
    expect(ActionMailer::Base.deliveries.count).to eq(1)
  end
end

require 'rails_helper'

feature 'user registers' do
  scenario 'provide valid registration information' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'First name', with: 'John'
    fill_in 'Last name', with: 'Jingleheimer'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign Up'
    # expect(page).to have_content('Welcome! You have signed up successfully.')
    # expect(page).to have_content('Log Out')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign Up'
    # expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Log Out')
  end
end

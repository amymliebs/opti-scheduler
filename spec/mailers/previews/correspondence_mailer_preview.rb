# Preview all emails at http://localhost:3000/rails/mailers/correspondence_mailer
class CorrespondenceMailerPreview < ActionMailer::Preview
  def invitation_email
    user = User.new(first_name: 'Tori', last_name: 'Tester', email: 'ttester@mail.com')
    event = Event.new(event_name: 'My Test Event', event_description: 'It will be great!', event_date: 'July 5th')

    @event = event
    @user = event.user

    CorrespondenceMailer.invitation_email(@event, @user)
  end
end

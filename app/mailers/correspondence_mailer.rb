class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event, user)
    @event = event
    @user = event.user
    @url = 'http://optischeduler.herokuapp.com'

    mail(
      bcc: @event.invitees,
      subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event: #{@event.event_name}! Please RSVP"
    )
  end
end

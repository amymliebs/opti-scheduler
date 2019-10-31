class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event, user, invitee)

    @event = event
    @user = event.user
    @invitee = invitee
    @url = "http://optischeduler.herokuapp.com/#{event.id}/invitees/#{invitee.id}"

    mail(
      bcc: @invitee.email,
      subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event: #{@event.event_name}! Please RSVP"
    )
  end
end

class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event, user, invitee)
    @event = event
    @user = event.user
    @invitee = invitee
    @url = "www.optischeduler.herokuapp.com/events/#{event.id}/invitees/
    #{invitee.id}"

    mail(
      bcc: @event.invitees,
      subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event: #{@event.event_name}! Please RSVP"
    )
  end
end

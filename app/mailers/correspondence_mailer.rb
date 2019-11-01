class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event, user, invitee, timeslots)

    @event = event
    @user = event.user
    @invitee = invitee
    @timeslots = timeslots

    @url = "https://optischeduler.herokuapp.com/events/#{event.id}/invitees/#{invitee.id}"

    mail(
      bcc: @invitee.email,
      subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event: #{@event.event_name}! Please RSVP"
    )
  end
end

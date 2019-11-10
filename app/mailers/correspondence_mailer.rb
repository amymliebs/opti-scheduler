class CorrespondenceMailer < ApplicationMailer
  def event_creation_email(event, user, invitees, timeslots)
    @event = event
    @user = user
    @invitees = invitees

    @url = "https://optischeduler.herokuapp.com/events/#{event.access_code}"

    mail(
      bcc: @user.email,
      subject: "Your Event Window '#{@event.event_name}' Has Been Created for #{@event.event_date}"
    )
  end

  def invitation_email(event, user, invitee, timeslots)
    @event = event
    @user = event.user
    @invitee = invitee
    @timeslots = timeslots

    @url = "https://optischeduler.herokuapp.com/events/#{event.access_code}/invitees/#{invitee.invitee_code}"

    mail(
      bcc: @invitee.email,
      subject: "Please RSVP! #{@user.first_name} #{@user.last_name} Has Invited You to an Event: '#{@event.event_name}!'"
    )
  end

  def host_schedule_email(event, user)
    @event = event
    @user = user

    @url = "https://optischeduler.herokuapp.com/events/#{event.access_code}"

    mail(
      bcc: @user.email,
      subject: "Your Schedule for #{@event.event_name} on #{@event.event_date} is Ready"
    )
  end

  def invitee_schedule_email(event, user, invitee, timeslot)
    @event = event
    @user = user
    @invitee = invitee
    @timeslot = timeslot

    mail(
      bcc: @invitee.email,
      subject: "Your Meeting with #{@user.first_name} on #{event.event_date} has been Scheduled"
    )
  end
end

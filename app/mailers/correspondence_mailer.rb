class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event, user)
    @event = event
    @user = event.user

    mail(
      bcc: event.invitees,
      subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event! Please RSVP"
    )

  end
end

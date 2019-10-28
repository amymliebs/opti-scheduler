class CorrespondenceMailer < ApplicationMailer
  def invitation_email(event)
    emails_array = event.invitees.split
    @user = event.user

    emails_array.each do |email|
      mail(
        to: email,
        subject: "#{@user.first_name} #{@user.last_name} Has Invited You to an Event! Please RSVP"
      )
    end
  end
end

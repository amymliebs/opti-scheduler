class InviteMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

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

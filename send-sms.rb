require 'twilio-ruby'

account_sid = ENV["TWILIO_ACCOUNT_SID"]
auth_token = ENV["TWILIO_AUTH_TOKEN"]
sending_phone = ENV["TWILIO_PHONE_NUMBER"]

@client = Twilio::REST::Client.new(account_sid, auth_token)

numbers_to_message = ["+13018039689", "+13018039689"]

numbers_to_messag.each do |number|
  @client.messages.create(
    to: number,
    from: sending_phone,
    body: "This is my OptiScheduler Twilio test!"
  )
  puts message.status
end

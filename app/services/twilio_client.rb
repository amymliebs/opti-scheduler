class TwilioClient
  attr_reader :client

  def initialize
    @client = Twilio::REST::Client.new(account_sid, auth_token)
  end

  def send_text(message, phone)
    client.api.account.messages.create(
      to: phone,
      from: sending_phone,
      body: message
    )
  end

  private

  def account_sid
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
  end

  def auth_token
    auth_token = ENV["TWILIO_AUTH_TOKEN"]
  end

  def sending_phone
    sending_phone = ENV["TWILIO_PHONE_NUMBER"]
  end
end

require 'rails_helper'

RSpec.describe TwilioController, type: :controller do

  describe "GET #sms" do
    it "returns http success" do
      get :sms
      expect(response).to have_http_status(:success)
    end
  end

end

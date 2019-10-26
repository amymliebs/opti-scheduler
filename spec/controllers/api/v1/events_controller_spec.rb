require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:event1) {
    FactoryBot.create(:event)
  }
  let!(:event2) {
    FactoryBot.create(:event)
  }

  describe "GET#index" do
    it "should return a list of the user's events" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2

      expect(returned_json[0]["event_name"]).to eq event1.event_name
      expect(returned_json[1]["event_name"]).to eq event2.event_name
    end
  end
end

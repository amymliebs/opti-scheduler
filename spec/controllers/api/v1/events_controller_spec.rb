require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:user1) {
    FactoryBot.create(:user)
  }

  let!(:user2) {
    FactoryBot.create(:user)
  }

  let!(:event1) {
    FactoryBot.create(:event, user_id: user1.id)
  }
  let!(:event2) {
    FactoryBot.create(:event, user_id: user2.id)
  }

  let!(:timeslot1) {
    FactoryBot.create(:timeslot, event_id: event1.id )
  }

  describe "GET#index" do
    it "should return a list of the user's events" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json[0]["event_name"]).to eq event1.event_name
    end
  end

  describe "POST#CREATE" do
    it "should successfully post when all required fields are filled in" do
      sign_in user1
      prev_count = Event.count
      ActionMailer::Base.deliveries = []

      event3 = {
        event: {
          event_name: "Tuesday, November 12 Check-Ins",
          event_description: "It's time for the weekly check-in. Please RSVP with your availability by Friday and you will be scheduled a meeting time.",
          event_date: "2019-11-12",
          rsvp_date: "2019-11-08",
          location: 'room 221'
        },
        timeslot: {
          slot: ['3:00-4:00pm']
        },
        invitee: {
          email: 'example@gmail.com, example@yahoo.com'
        }
      }

      post :create, :params => event3, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)

      expect(returned_json["event_name"]).to eq event3[:event][:event_name]
      expect(returned_json["event_description"]).to eq event3[:event][:event_description]
      expect(returned_json["event_date"]).to eq event3[:event][:event_date]
      expect(returned_json["rsvp_date"]).to eq event3[:event][:rsvp_date]
      expect(returned_json["location"]).to eq event3[:event][:location]

      expect(Event.count).to eq(prev_count + 1)

      expect(ActionMailer::Base.deliveries.size).to eq(3)
      last_email = ActionMailer::Base.deliveries.last
    end

    it "should not post when all required fields are not filled in" do
      sign_in user1
      prev_count = Event.count

      event4 = {
        event: {
          event_name: "",
          event_description: "It's time for the weekly check-in. Please RSVP with your availability by Friday and you will be scheduled a meeting time.",
          event_date: "11-12-2019",
          rsvp_date: "11-08-2019",
          location: 'room 221'
        },
        timeslot: {
          slot: ['9:00-10:00am']
        },
        invitee: {
          email: 'example@gmail.com, example@yahoo.com'
        }
      }

      post :create, :params => event4, format: :json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)

      expect(returned_json["event_name"]).to eq event4["can't be blank"]
      expect(Event.count).to eq(prev_count)
    end

    it 'sends an invitation email' do
      ActionMailer::Base.deliveries = []
      FactoryBot.create(:event, user_id: user1.id)

      expect(ActionMailer::Base.deliveries.size).to eq(0)
    end
  end

  describe "DELETE#destroy" do
    it "should successfully delete an event" do
      sign_in user1
      prev_count = Event.count

      delete :destroy, :params => {event: event1, id: event1.access_code}, format: :json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)

      expect(returned_json["event_name"]).to eq nil
      expect(returned_json["event_description"]).to eq nil
      expect(returned_json["event_date"]).to eq nil
      expect(returned_json["rsvp_date"]).to eq nil
      expect(returned_json["location"]).to eq nil

      expect(Event.count).to eq(prev_count - 1)
    end
  end
end

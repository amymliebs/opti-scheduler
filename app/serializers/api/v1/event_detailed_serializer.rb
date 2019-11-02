class Api::V1::EventDetailedSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :event_description, :event_date, :rsvp_date, :rsvp_status, :access_code, :invitees, :location, :slot
end

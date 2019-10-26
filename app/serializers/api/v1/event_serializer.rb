class Api::V1::EventSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :rsvp_status
end

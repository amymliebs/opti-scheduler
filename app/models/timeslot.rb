class Timeslot < ApplicationRecord
  validates :slot, presence: true

  belongs_to :event
end

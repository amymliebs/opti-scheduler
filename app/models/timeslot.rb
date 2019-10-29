class Timeslot < ApplicationRecord
  validates :times, presence: true

  belongs_to :event
end

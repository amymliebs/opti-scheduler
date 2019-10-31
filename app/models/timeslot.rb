class Timeslot < ApplicationRecord
  validates :slot, presence: true

  belongs_to :event
  has_many :availabilities
  has_many :invitees, through: :availabilities
end

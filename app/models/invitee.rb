class Invitee < ApplicationRecord
  validates :email, presence: true

  belongs_to :event
  has_many :availabilities
  has_many :timeslots, through: :availabilities
end

class Invitee < ApplicationRecord
  validates :email, presence: true
  validates :invitee_code, uniqueness: true
  has_secure_token :invitee_code, length: 6

  belongs_to :event
  has_many :availabilities
  has_many :timeslots, through: :availabilities
end

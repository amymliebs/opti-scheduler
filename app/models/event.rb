class Event < ApplicationRecord
  validates :event_name, presence: true
  validates :event_date, presence: true
  validates :rsvp_date, presence: true
  validates :access_code, uniqueness: true
  has_secure_token :access_code, length: 6

  belongs_to :user
  has_many :timeslots, dependent: :destroy
  has_many :invitees, dependent: :destroy
end

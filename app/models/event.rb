class Event < ApplicationRecord
  validates :event_name, presence: true
  validates :access_code, uniqueness: true
  has_secure_token :access_code, length: 6

  belongs_to :user
  has_many :events
end

class Availability < ApplicationRecord
  validates :status, presence: true
  belongs_to :timeslot
  belongs_to :invitee

end

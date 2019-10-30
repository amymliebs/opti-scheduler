class Invitee < ApplicationRecord
  validates :email, presence: true

  belongs_to :event
end

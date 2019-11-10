class Invitee < ApplicationRecord
  validates :email, presence: true
  # validates :phone, format: { with: /\d{3}-\d{3}-\d{4}/, message: "Reformat phone number" }
  validates :invitee_code, uniqueness: true
  has_secure_token :invitee_code, length: 6

  belongs_to :event
  has_many :availabilities
  has_many :timeslots, through: :availabilities

  def full_name
    if !first_name.nil? && !last_name.nil?
      first_name + " " + last_name
    elsif first_name.nil?
      last_name
    else
      first_name
    end
  end

  def number
    return "+1#{phone.split("-").join}"
  end
end

class User < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :role, presence: true
  
  has_many :events

  def admin?
    role == "admin"
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

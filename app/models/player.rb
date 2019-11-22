class Player < ApplicationRecord
  # Associations
  belongs_to :team, required: false

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end

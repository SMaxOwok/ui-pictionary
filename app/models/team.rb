class Team < ApplicationRecord
  # Associations
  belongs_to :game
  has_many :players, dependent: :nullify
end

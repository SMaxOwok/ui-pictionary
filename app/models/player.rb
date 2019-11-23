class Player < ApplicationRecord
  # Associations
  belongs_to :team, required: false, touch: true

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true

  def abandon_team!
    update team_id: nil
  end
end

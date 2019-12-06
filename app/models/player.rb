class Player < ApplicationRecord
  # Associations
  belongs_to :team,
             inverse_of: :players,
             required: false,
             touch: true

  # Validations
  validates :email, presence: true, uniqueness: true

  # Callbacks
  after_commit :broadcast!, unless: :skip_broadcast

  attr_accessor :skip_broadcast

  def abandon_team!
    update team_id: nil
  end

  private

  def broadcast!
    Channels::BroadcastObjectJob.perform_later "player:#{id}", self
  end

  class << self
    def fetch(email)
      find_or_create_by(email: email) if email.present?
    end
  end
end

class Team < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :teams
  has_many :players,
           inverse_of: :team,
           dependent: :nullify,
           after_remove: :broadcast_player!

  # Validations
  validates :name, presence: true

  # Callbacks
  after_commit :broadcast!

  # Enums
  enum palette: { primary: 0, secondary: 1 }

  private

  def broadcast_player!(player)
    Channels::BroadcastObjectJob.perform_later "player:#{player.id}", player
  end

  def broadcast!
    Channels::BroadcastObjectJob.perform_later "team:#{id}",
                                               self,
                                               include: %w[players]
  end
end
